const { MongoClient } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017", (err, client) => {

    if (err) {
        return console.log("Unable to connect mongo server")
    }
    const db = client.db("TodoApps")
    const collection = db.collection('Todos')


    // deleteMany

    // collection.deleteMany({ age: 25 }).then((result) => {
    //     console.log(result)
    // }).catch(err => { console.log(err) })

    // // deleteOne
    // collection.deleteOne({ age: 20 }).then((result) => {
    //     console.log(result)
    // }).catch(err => { console.log(err) })

    //findOneAndDelete

    collection.findOneAndDelete({ text: 'Some thing added in mongodb' }).then(result => {
        console.log(JSON.stringify(result.value , undefined, 4))
    })

    client.close();
})  