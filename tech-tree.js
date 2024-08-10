fetch('techs.json')
    .then(response => response.json())
    .then(data => {
        const techTreeContainer = document.getElementById('tech-tree');

        data.techs.forEach(tech => {
            // Create the tech node
            const techNode = document.createElement('div');
            techNode.className = `tech-node ${tech.status}`;
            techNode.style.left = `${tech.position.x}px`;
            techNode.style.top = `${tech.position.y}px`;
            techNode.innerHTML = `<h3>${tech.name}</h3><p>${tech.turns} Turns</p>`;
            
            techNode.addEventListener('click', () => {
                if (!techNode.classList.contains('researched')) {
                    alert(`You selected ${tech.name} for research!`);
                }
            });
            
            techTreeContainer.appendChild(techNode);

            // Draw connections
            if (tech.connections) {
                tech.connections.forEach(connection => {
                    const connectedTech = data.techs.find(t => t.id === connection);
                    if (connectedTech) {
                        drawConnection(techNode, connectedTech);
                    }
                });
            }
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
