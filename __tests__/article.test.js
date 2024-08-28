const app = require('../app')
const request = require('supertest')
const testData = require('../db/data/test-data')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/articles/:article_id', () => {
    it('should respond with the correct article object when given a valid article ID', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
                expect(body.article).toHaveProperty('article_id', expect.any(Number))
                expect(body.article).toHaveProperty('title', expect.any(String))
                expect(body.article).toHaveProperty('topic', expect.any(String))
                expect(body.article).toHaveProperty('author', expect.any(String))
                expect(body.article).toHaveProperty('body', expect.any(String))
                expect(body.article).toHaveProperty('created_at', expect.any(String))
                expect(body.article).toHaveProperty('votes', expect.any(Number))
            });
    });
    it('should respond with a 200 status code for valid article ID', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200);
      });
    
    it('should respond with a 400 error when given an invalid article ID', () => {
        return request(app)
          .get('/api/articles/999999')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('Article not found');
          });
      });
});