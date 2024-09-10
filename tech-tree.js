fetch('techs.json')
    .then(response => response.json())
    .then(data => {
        const techTreeContainer = document.getElementById('tech-tree');

        data.forEach((tech, index) => {
            // Create the tech node
            const techNode = document.createElement('div');
            techNode.className = `tech-node ${tech.status || 'unresearched'}`;
            techNode.style.left = `${index * 150}px`; // Example for horizontal layout
            techNode.style.top = `${Math.floor(index / 4) * 150}px`; // Example for grid layout
            techNode.innerHTML = `
                <h3>${tech.name}</h3>
                <p>${tech.category}</p>
                <p>${tech.percentCompleted}% Completed</p>
            `;
            
            techNode.addEventListener('click', () => {
                if (!techNode.classList.contains('researched')) {
                    alert(`You selected ${tech.name} for research!`);
                }
            });
            
            techTreeContainer.appendChild(techNode);

            // Draw connections (if you implement it later)
            // if (tech.connections) {
            //     tech.connections.forEach(connection => {
            //         const connectedTech = data.find(t => t.name === connection);
            //         if (connectedTech) {
            //             drawConnection(techNode, connectedTech);
            //         }
            //     });
            // }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));

function drawConnection(fromNode, toNode) {
    const fromRect = fromNode.getBoundingClientRect();
    const toRect = toNode.getBoundingClientRect();

    const line = document.createElement('div');
    line.className = 'connection-line';
    line.style.left = `${fromRect.right}px`;
    line.style.top = `${fromRect.top + fromRect.height / 2}px`;
    line.style.height = `${toRect.top + toRect.height / 2 - fromRect.top - fromRect.height / 2}px`;

    document.getElementById('tech-tree').appendChild(line);
}
