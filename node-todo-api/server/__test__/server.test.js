const request = require("supertest")
const { app } = require("./../server")
const Todo = require("./../models/Todo");

beforeEach((done) => {
    Todo.remove().then(() => done())
})
describe('PORT /todos', () => {
    it('should add new todo', (done) => {
        const text = 'This text added from test'
        request(app)
            .post('/api/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((e, res) => {
                if (e) {
                    return done(e)
                }

                Todo.find().then(res => {
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
            .send({ })
            .expect(400)
            .end((e, r) => {
                if (e) {
                    return done(e)
                }

                Todo.find().then(res => {
                    expect(res.length).toBe(0);
                    done()
                }).catch(e => done(e))
            })
    })

})