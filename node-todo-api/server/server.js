const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb")
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const config = require("./config/config");
const { mongoose } = require("./db/mongoose");
const User = require("./models/User");
const Todo = require("./models/Todo");
const { authenticate } = require("./middleware/authenticate");
const app = express();

app.use(bodyParser.json());

app.post('/api/todos', authenticate, (req, res) => {

    const newTodo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    newTodo.save().then(doc => {
        res.send(doc);
    }).catch(e => {
        res.status(400).send(e)
    })
});

app.get('/api/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then(todos => {
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

app.delete('/api/todos/:id', (req, res) => {
    //get id from params
    const id = req.params.id;
    // if id is not valid return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send(null);
    }
    //remove todo by id
    Todo.findByIdAndRemove(id)
        .then((doc) => {
            //success
            if (!doc) {
                //if no docs,send 404
                res.status(404).send(null);
            } else {
                //if docs send doc with 200
                res.status(200).send({ todo: doc })
            }
        }).catch(e => {
            //error
            res.send(400).send(null)
            //send with 400 with empty body
        })

})

app.patch('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send(null)
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((todo) => {
            if (!todo) {
                return res.status(404).send(null)
            }
            res.status(200).send({ todo })
        }).catch(e => {
            res.status(400).send(null)
        })

})

app.post('/api/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const newUser = new User(body);

    newUser.save()
        .then(() => {
            return newUser.generateAuthToken();
        })
        .then((token) => res.header('x-auth', token).status(200).send(newUser))
        .catch(e => res.status(400).send('Unable to create new User'))

})

// POST /api/users/login

app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;
    User.findByCredentials(email, password)
        .then((user) => {
            user.generateAuthToken().then(token => {
                return res.status(200).header('x-auth', token).send(user)
            })
        })
        .catch(e => res.status(400).send())
})



app.get('/api/users/me', authenticate, (req, res) => {
    const token = req.header('x-auth');
    res.send(req.user)

})

// DELETE /api/users/token

app.delete('/api/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send()
    }).catch(e => res.status(401).send())
})

app.listen(config.PORT, () => {
    console.log(`Started server on PORT: ${config.PORT}`)
})

module.exports = {
    app
}