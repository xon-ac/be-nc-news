const app = require('../app')
const request = require('supertest')
const testData = require('../db/data/test-data')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')


beforeEach(() => seed(testData));
afterAll(() => db.end());


describe('GET /api/topics', () => {
  it('should respond with topics array', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {console.log(response)})
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)
    response.body.forEach(topic => {
      expect(topic).toHaveProperty('slug')
      expect(topic).toHaveProperty('description')
    })
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