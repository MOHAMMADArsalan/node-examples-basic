const request = require("supertest")
const { ObjectID } = require("mongodb")
const { app } = require("./../server")
const Todo = require("./../models/Todo");
const User = require("./../models/User");
const { todos, populateTodos, populateUsers, users } = require("./seed/seed")



beforeEach(populateTodos);
beforeEach(populateUsers)

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

describe('DELETE /api/todos/:id', () => {
    test('should delete todo', (done) => {
        const id = todos[0]._id.toString()
        request(app)
            .delete(`/api/todos/${id}`)
            .expect(200)
            .expect(res => { expect(res.body.todo.text).toBe(todos[0].text) })
            .end(done)
    })

    test('should return 404 if todo not found', (done) => {
        const id = new ObjectID().toString();

        request(app)
            .delete(`/api/todos/${id}`)
            .expect(404)
            .end(done);
    })

    test('should return 404 if non-object if provided', (done) => {
        request(app)
            .delete(`/api/todos/45145`)
            .expect(404)
            .end(done);
    })

})

describe("PATCH /api/todos/:id", () => {

    test('should update todo', (done) => {
        request(app)
            .patch(`/api/todos/${todos[0]._id}`)
            .send({ text: 'hello', completed: true })
            .expect(200)
            .expect(res => {
                expect(res.body.todo.completed).toBe(true)
            })
            .end(done)
    })

    test('should return 404 if non-object provided', () => {

    })
})


describe('GET /api/users/me', () => {

    test('should return user if authenticated', (done) => {

        request(app)
            .get('/api/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString())
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done)
    })

    test('should return 401 if user not authenticated', (done) => {
        request(app)
            .get('/api/users/me')
            .expect(401)
            .expect(res => expect(res.body).toEqual({}))
            .end(done)
    })

})


describe("POST /api/users", () => {
    test('should create user', (done) => {
        const email = 'test@gmail.com';
        const password = '123456!';

        request(app)
            .post('/api/users')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                User.findOne({ email })
                    .then(user => {
                        expect(user).toBeTruthy();
                        expect(user.password).not.toBe(password)
                        done();
                    })
            });
    })

    test('should not create new user if request is invalid', (done) => {
        request(app)
            .post('/api/users')
            .send({ email: 'email', password: '1234555' })
            .expect(400)
            .end(done);
    })

    test('should not create new user if email is already exist', (done) => {
        const email = users[0].email;
        const password = '123456!';
        request(app)
            .post('/api/users')
            .send({ email, password })
            .expect(400)
            .end(done);
    })

})