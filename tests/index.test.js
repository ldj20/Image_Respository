const request = require('supertest');
const app = require('../app');
const User = require('../backend/users/user.model');
//const agentReq = require('superagent');
const test_user = request.agent(app);

describe('test sign up', () => {
    test('basic sign up', async () => {
        await User.deleteMany({})
        await request(app).post('/api/users')
        .send({
            email: 'test@test.test',
            password: 'cdsj99eivdf'
        })
        .expect(201)
    })

    test('too short email signup', async () => {
        await request(app).post('/api/users')
        .send({
            email: 'tes',
            password: 'cdsj99eivdf'
        })
        .expect(422)
    })

    test('too short password signup', async () => {
        await request(app).post('/api/users')
        .send({
            email: 'test@test.test',
            password: 'c'
        })
        .expect(422)
    })

    test('blank email and password', async () => {
        await request(app).post('/api/users')
        .send({
            email: '',
            password: ''
        })
        .expect(422)
    })
})

describe('test login', () => {
    test('access protected endpoint without authorization', async () => {
        await test_user.get('/api/users/images')
        .expect(401)
    })

    test('basic login', function(done) {
        test_user.post('/api/users/login')
        .send({
            username: 'test@test.test', 
            password: 'cdsj99eivdf' 
        })
        .end(function(err, res) {
          expect(res.status).toBe(200);
          done();
        });
    });

    test('session persistance', async () => {
        await test_user.get('/api/users/images')
        .expect(200)
    })

    test('incorrect password', async () => {
        await request(app).post('/api/users/login')
        .send({
            username: 'test@test.test',
            password: 'cdsjfdskn99eivdf'
        })
        .expect(400)
    })

    test('incorrect email', async () => {
        await request(app).post('/api/users/login')
        .send({
            username: 'test@test.t',
            password: 'cdsj99eivdf'
        })
        .expect(400)
    })

    test('blank password', async () => {
        await request(app).post('/api/users/login')
        .send({
            username: 'test@test.test',
            password: ''
        })
        .expect(422)
    })

    test('blank information', async () => {
        await request(app).post('/api/users/login')
        .send({
            username: '',
            password: ''
        })
        .expect(422)
    })
})