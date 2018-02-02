const request = require("supertest")
const { app } = require("./../server")
const Todo = require("./../models/Todo");

const todos = [
    { text: 'first Todo' },
    { text: 'second Todo' },
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