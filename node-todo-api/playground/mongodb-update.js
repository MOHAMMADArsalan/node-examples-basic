const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017", (err, client) => {

    if (err) {
        return console.log("Unable to connect mongodb server!!!");
    }

    const db = client.db("TodoApps")
    const collection = db.collection("Todos")

    collection.findOneAndUpdate({
        _id: new ObjectID('5a72cc6c40585b204c98c8e0')
    }, {
            $set: {
                text: 'New Todo 5'
            },
            $inc: {
                age: 2
            }
        }, {
            returnOriginal: false
        }).then(res => { console.log(res) })
        .catch(err => console.log(err));

    client.close();
})