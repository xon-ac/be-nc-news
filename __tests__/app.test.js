const app = require('../app')
const request = require('supertest')
const testData = require('../db/data/test-data')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')


beforeEach(() => seed(testData));
afterAll(() => db.end());


describe('GET /api/topics', () => {
  it('should respond with topics', () => {
    return request(app)
      .get('/api/topics')
       .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.topics)).toBe(true);
          });
    })
  
    test("status:404, responds with an error message when passed a bad path", () => {
        return request(app)
          .get("/api/invalidpath")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Not Found");
          });
    });
});