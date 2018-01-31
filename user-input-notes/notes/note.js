const fs = require("fs");


function fetchNodes() {
    try {
        const previousNodes = fs.readFileSync('nodes-data.json');
        return JSON.parse(previousNodes)

    } catch (e) {
        return []
    }
}

function writeNode(nodes) {
    fs.writeFileSync('nodes-data.json', JSON.stringify(nodes));

}

function findNode(nodes, title) {
    return nodes.find(node => node.title === title);
}

function findNodeIndex(nodes, title) {
    return nodes.findIndex(node => node.title === title);
}


function addNode(title, body) {
    let nodes = fetchNodes(),
        node = { title, body },
        isExist = findNode(nodes, title);

    if (!isExist) {
        nodes.push(node);
        writeNode(nodes);
        return node;
    }
}

function getNode(title) {
    return findNode(fetchNodes(), title)
}

function removeNode(title) {
    let nodes = fetchNodes();
    console.time();
    let removeNodeIndex = findNodeIndex(nodes, title);
    if (removeNodeIndex > -1) {
    let filterNodes = nodes.splice(removeNodeIndex, 1)
    // let filterNodes = nodes.filter(node => node.title !== title)
    writeNode(filterNodes);
    console.timeEnd();
    // return node;
 }
}

module.exports = {
    addNode,
    getNode,
    removeNode
}