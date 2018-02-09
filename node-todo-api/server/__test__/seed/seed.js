const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");
const config = require("./../../config/config");
const User = require("./../../models/User");
const Todo = require("./../../models/Todo");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
    {
        _id: userOneId,
        email: 'arsalan@gmail.com',
        password: 'pass123',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userOneId, access: 'auth' }, config.JWT_SECRET_TOKEN)
            }
        ]
    },
    {
        _id: userTwoId,
        email: 'arsalan2@gmail.com',
        password: 'pass12345'
    }
]

const todos = [
    {
        _id: new ObjectID(),
        text: 'first Todo'
    },
    {
        _id: new ObjectID(),
        text: 'second Todo'
    },
]

const populateTodos = (done) => {
    Todo.remove().then(() => {
        Todo.insertMany(todos).then(() => {
            done()
        })
    })
}

const populateUsers = (done) => {
    User.remove().then(() => {
        const userOne = new User(users[0]);
        const userTwo = new User(users[1])

        return Promise.all([userOne.save(), userTwo.save()]);
    })
        .then(() => done())
}

module.exports = { todos, users, populateTodos, populateUsers }