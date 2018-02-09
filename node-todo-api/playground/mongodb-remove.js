const { mongoose } = require("./../server/db/mongoose");
const Todo = require("./../server/models/Todo");

const id = "5a74132e0436501308f24691";

//Remove all todos
// Todo.remove({}).then((result) => { console.log(result) });

// findOneAndRemove
// Todo.findOneAndRemove({ _id: id }).then((todo) => { console.log(todo) })

// findByIdAndRemove
// Todo.findByIdAndRemove(id).then((todo) => { console.log(todo) })