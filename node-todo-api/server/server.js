const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb")

const config = require("./config/config");
const { mongoose } = require("./db/mongoose");
const User = require("./models/User");
const Todo = require("./models/Todo");

const app = express();

app.use(bodyParser.json());

app.post('/api/todos', (req, res) => {

    const newTodo = new Todo({
        text: req.body.text
    });

    newTodo.save().then(doc => {
        res.send(doc);
    }).catch(e => {
        res.status(400).send(e)
    })
});

app.get('/api/todos', (req, res) => {
    Todo.find().then(todos => {
        res.send({ todos })
    }).catch(e => {
        res.status(400).send(e)
    })
})

app.get("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send(null)
    }

    Todo.findById(id).then(todo => {
        if (!todo) {
            return res.status(404).send(null)
        }
        return res.status(200).send({ todo })
    }).catch(e => {
        res.status(400).send(null)
    })
})

app.listen(config.PORT, () => {
    console.log(`Started server on PORT: ${config.PORT}`)
})

module.exports = {
    app
}