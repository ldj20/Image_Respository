const request = require('supertest');
const app = require('../app');
const User = require('../backend/users/user.model');
const test_user = request.agent(app);
const fs = require('file-system');

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

describe('test image creation', () => {
    const file1 = fs.createReadStream('uploads_test/cat.jpeg');

    test('no file attached', async () => {
        await test_user.post('/api/images')
        .field('isPublic', true)
        .expect(422)
    })

    test('file attached', async () => {
        await test_user.post('/api/images')
        .field('isPublic', true)
        .field('file', file1)
        .expect(200)
    })

    test('private file attached', async () => {
        await test_user.post('/api/images')
        .field('isPublic', false)
        .field('file', file1)
        .expect(200)
    })

})

describe('get images', () => {
    test('user images', async () => {
        await test_user.get('/api/users/images')
        .expect(200)
    })

    test('overall images', async () => {
        await test_user.get('/api/images')
        .expect(200)
    })
})

describe('delete images', () => {
    test('one public image', async () => {
        await test_user.delete('/api/users')
        .field('images')
        .expect
    })
})