const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/users', () => {
    test('should respond with status 200 and an array of user objects', () => {
        return request(app)
            .get('/api/users')
            .expect(200)
            .then(({ body }) => {
                const { users } = body;
                expect(users).toBeInstanceOf(Array);
                users.forEach((user) => {
                    expect(user).toEqual(
                        expect.objectContaining({
                            username: expect.any(String),
                            name: expect.any(String),
                            avatar_url: expect.any(String),
                        })
                    );
                });
            });
    });

    test('should respond with status 404 if the endpoint does not exist', () => {
        return request(app)
            .get('/api/nonexistentendpoint')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not Found');
            });
    });
});