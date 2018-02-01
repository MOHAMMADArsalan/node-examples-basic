const MongoClient = require("mongodb").MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log("Unable to connect with mongodb server");
    }
    console.log("Mongodb server connected")
    const db = client.db('TodoApps');
    db.collection('Todos').insertOne({
        text: 'Some thing added in mongodb',
        completed: false
    }, (err, res) => {
        if (err) {
            return console.log("Unable to insert in db", err);
        }
        console.log(`${JSON.stringify(res.ops, undefined, 2)}`)
    })

    db.collection("Users").insertOne({
        name: 'Mohammad Arsalan',
        age: 25,
        location: 'Karachi'
    }, (err, res) => {
        if (err) {
            return console.log("Unable to insert in db", err);
        }
        console.log(`${JSON.stringify(res.ops, undefined, 2)}`)
    })

    client.close();
})