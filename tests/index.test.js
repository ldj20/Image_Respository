const request = require('supertest');
const app = require('../app');
const User = require('../backend/users/user.model');

test('sign up', async () => {
    await User.deleteMany({})
    await request(app).post('/api/users')
    .send({
        email: 'test@test.test',
        password: 'cdsj99eivdf'
    })
    .expect(201)
})

test('login', async () => {
    await request(app).post('/api/users/login')
    .send({
        email: 'test@test.test',
        password: 'cdsj99eivdf'
    })
    .expect(200)
})

test('login', async () => {
    await request(app).post('/api/users/login')
    .send({
        email: 'test@test.test',
        password: 'cdsjfdskn99eivdf'
    })
    .expect(401)
})