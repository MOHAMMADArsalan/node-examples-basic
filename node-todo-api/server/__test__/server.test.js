const request = require("supertest")
const { ObjectID } = require("mongodb")
const { app } = require("./../server")
const Todo = require("./../models/Todo");

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


beforeEach((done) => {
    Todo.remove().then(() => {
        Todo.insertMany(todos).then(() => {
            done()
        })
    })
})
describe('PORT /api/todos', () => {
    it('should add new todo', (done) => {
        const text = 'This text added from test'
        request(app)
            .post('/api/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((e, res) => {
                if (e) {
                    return done(e)
                }

                Todo.find({ text }).then(res => {
                    expect(res.length).toBe(1);
                    expect(res[0].text).toBe(text)
                    done()
                }).catch(err => {
                    done(err)
                })

            })
    })

    test('Should not add new todo', (done) => {

        request(app)
            .post('/api/todos')
            .send({})
            .expect(400)
            .end((e, r) => {
                if (e) {
                    return done(e)
                }

                Todo.find().then(res => {
                    expect(res.length).toBe(2);
                    done()
                }).catch(e => done(e))
            })
    })
})


describe('GET /api/todos', () => {
    test('should get all todos', (done) => {
        request(app)
            .get('/api/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done)
    })
})

describe('GET /api/todos/:id', () => {
    test('should return todo doc', (done) => {
        request(app)
            .get(`/api/todos/${todos[0]._id.toString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })

    test('should return 404 if todo not found ', (done) => {
        const id = new ObjectID().toString();
        request(app)
            .get(`/api/todos/${id}`)
            .expect(404)
            .end(done)
    })

    test('should return 404 if non-object id', (done) => {
        request(app)
            .get(`/api/todos/1245sfdd`)
            .expect(404)
            .end(done)
    })
})