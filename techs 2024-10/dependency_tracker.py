import os
import json
import argparse
from collections import defaultdict

def load_json_files(directory):
    """
    Load all JSON files from the specified directory.

    :param directory: Path to the directory containing JSON files.
    :return: List of loaded technology entries.
    """
    json_data = []
    for filename in os.listdir(directory):
        if filename.endswith('.json'):
            filepath = os.path.join(directory, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as file:
                    data = json.load(file)
                    if isinstance(data, list):
                        json_data.extend(data)
                        print(f"Loaded {filename} with {len(data)} technologies.")
                    else:
                        print(f"Warning: {filename} does not contain a list of technologies.")
            except json.JSONDecodeError as e:
                print(f"Error decoding JSON from file {filename}: {e}")
            except Exception as e:
                print(f"Error reading file {filename}: {e}")
    return json_data

def build_technology_to_group_map(json_data):
    """
    Build a mapping from technology names to their respective groups.

    :param json_data: List of technology entries loaded from files.
    :return: Dictionary mapping technology names to group names.
    """
    tech_to_group = {}
    for tech in json_data:
        tech_name = tech.get('name')
        group_name = tech.get('category')
        if tech_name and group_name:
            if tech_name in tech_to_group:
                print(f"Warning: Technology '{tech_name}' is defined in multiple groups ('{tech_to_group[tech_name]}' and '{group_name}').")
            tech_to_group[tech_name] = group_name
        else:
            print(f"Warning: Technology entry missing 'name' or 'category': {tech}")
    return tech_to_group

def normalize_field(field):
    """
    Normalize a field to a flat list of strings.

    :param field: The field to normalize (can be string, list, or nested list).
    :return: Flat list of strings.
    """
    if isinstance(field, list):
        flattened = []
        for item in field:
            if isinstance(item, list):
                flattened.extend(normalize_field(item))
            elif isinstance(item, str):
                flattened.append(item)
            else:
                print(f"Warning: Unexpected type in list: {item} (type: {type(item)})")
        return flattened
    elif isinstance(field, str):
        return [field]
    else:
        print(f"Warning: Unexpected field type: {field} (type: {type(field)})")
        return []

def build_dependency_graph(json_data, tech_to_group):
    """
    Build a comprehensive dependency graph considering both prerequisites and futureTechDependents.

    :param json_data: List of technology entries loaded from files.
    :param tech_to_group: Dictionary mapping technology names to group names.
    :return: Tuple of two dictionaries:
             - group_dependencies_forward: Group -> Set of groups it depends on.
             - group_dependencies_reverse: Group -> Set of groups that depend on it.
    """
    group_dependencies_forward = defaultdict(set)
    group_dependencies_reverse = defaultdict(set)

    for tech in json_data:
        current_group = tech.get('category')
        tech_name = tech.get('name')

        # Process prerequisites (forward dependencies)
        prerequisites = tech.get('prerequisites', [])
        normalized_prereqs = normalize_field(prerequisites)
        for prereq in normalized_prereqs:
            prereq_group = tech_to_group.get(prereq)
            if prereq_group:
                if prereq_group != current_group:
                    group_dependencies_forward[current_group].add(prereq_group)
            else:
                print(f"Warning: Prerequisite '{prereq}' for technology '{tech_name}' not found in any group.")

        # Process futureTechDependents (reverse dependencies)
        future_dependents = tech.get('futureTechDependents', [])
        normalized_dependents = normalize_field(future_dependents)
        for dependent in normalized_dependents:
            dependent_group = tech_to_group.get(dependent)
            if dependent_group:
                if dependent_group != current_group:
                    group_dependencies_reverse[current_group].add(dependent_group)
            else:
                print(f"Warning: FutureTechDependent '{dependent}' for technology '{tech_name}' not found in any group.")

    return group_dependencies_forward, group_dependencies_reverse

def merge_dependencies(forward, reverse):
    """
    Merge forward and reverse dependencies to get a comprehensive inter-group dependency map.

    :param forward: Dictionary mapping groups to groups they depend on.
    :param reverse: Dictionary mapping groups to groups that depend on them.
    :return: Single dictionary mapping each group to a set of groups it depends on.
    """
    merged = defaultdict(set)

    # Add forward dependencies
    for group, deps in forward.items():
        merged[group].update(deps)

    # Add reverse dependencies
    for group, dependents in reverse.items():
        for dependent in dependents:
            merged[dependent].add(group)

    return merged

def save_dependency_map(dependency_map, output_file):
    """
    Save the dependency map to a JSON file.

    :param dependency_map: Dictionary mapping groups to their dependencies.
    :param output_file: Path to the output JSON file.
    """
    # Convert sets to sorted lists for JSON serialization
    serializable_map = {group: sorted(list(deps)) for group, deps in dependency_map.items()}
    try:
        with open(output_file, 'w', encoding='utf-8') as file:
            json.dump(serializable_map, file, indent=4)
            print(f"Dependency map saved to {output_file}")
    except Exception as e:
        print(f"Error writing to file {output_file}: {e}")

def main(input_directory, output_file):
    # Step 1: Load all JSON files
    json_data = load_json_files(input_directory)
    if not json_data:
        print("No JSON data loaded. Exiting.")
        return

    # Step 2: Build technology to group mapping
    tech_to_group = build_technology_to_group_map(json_data)

    # Step 3: Build dependency graphs
    forward_deps, reverse_deps = build_dependency_graph(json_data, tech_to_group)

    # Step 4: Merge dependencies
    comprehensive_deps = merge_dependencies(forward_deps, reverse_deps)

    # Step 5: Save the dependency map to a new JSON file
    save_dependency_map(comprehensive_deps, output_file)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze JSON files to track inter-group dependencies considering prerequisites and futureTechDependents.")
    parser.add_argument(
        '-i', '--input',
        type=str,
        required=True,
        help='Path to the directory containing JSON files.'
    )
    parser.add_argument(
        '-o', '--output',
        type=str,
        default='inter_group_dependencies.json',
        help='Path for the output JSON file.'
    )

    args = parser.parse_args()
    main(args.input, args.output)
