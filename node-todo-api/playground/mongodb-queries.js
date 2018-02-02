const { ObjectID } = require("mongodb")
const { mongoose } = require("./../server/db/mongoose");
const Todo = require("./../server/models/Todo");

const id = "5a74014753f8a4077819e592";
// if(!ObjectID.isValid(id)) {
//     console.log("Object id not valid")
// }
Todo.find({
    _id: id
}).then(todos => {
    // console.timeEnd()
    console.log("ARRAY OF TODOS TODOS :::: ", todos)
})

// console.time('FINDONE QUERY')
Todo.findOne({
    _id: id
}).then(todo => {
    // console.timeEnd()
    console.log('TODO OBJECT ::::: ', todo)
})

Todo.findById(id).then(todo => {

    console.log('TODO OBJECT ::::: ', todo)
})