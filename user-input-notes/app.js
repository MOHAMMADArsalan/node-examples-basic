const yargs = require("yargs");
const { addNode, getNode, removeNode } = require("./notes/note");

const titleOptions = {
    describe: 'Title of node',
    demand: true,
    alias: 't'
};

const argv = yargs
    .command('add', 'Add a new node', {
        title: titleOptions,
        body: {
            describe: 'Body of node',
            demand: true,
            alias: 'b'
        }
    })
    .command('list', 'List all nodes')
    .command('removeNode', 'Remove a node', {
        title: titleOptions
    })
    .command('getNode', 'Get a specific node', {
        title: titleOptions
    })
    .help()
    .argv;
const { title, body } = argv;
const command = argv._[0];

switch (command) {
    case 'add':
        let node = addNode(title, body);
        if (node) {
            console.log("Node Created");
        } else {
            console.log("Node has been taken")
        }
        break;
    case 'getNode':
        let findNode = getNode(title);
        if (findNode) {
            console.log('Node');
            console.log('----');
            console.log(`Title: ${findNode.title}`);
            console.log(`Body: ${findNode.body}`);
        } else {
            console.log("Node not found")
        }
        break;
    case 'removeNode':
        removeNode(title)
        break;
}
