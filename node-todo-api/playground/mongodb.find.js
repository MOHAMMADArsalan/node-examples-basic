const { MongoClient } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017", (err, client) => {

    if (err) {
        return console.log("Unable to connect mongodb server");
    }

    const db = client.db('TodoApps');

    db.collection("Users").find().toArray().then((todo) => {
        console.log(JSON.stringify(todo, undefined, 2))
    }).catch(err => {
        console.log(err)
    })

    client.close();

})