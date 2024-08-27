const app = require('../app')
const request = require('supertest')
const testData = require('../db/data/test-data')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')

afterAll(() => {
    return db.end();
  });
  
  beforeEach(() => {
    return seed(testData);
  });

describe('GET /api/topics', () => {
    it('should return an array of topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
            expect(body.toMatchObject([
                { description: 'Code is love, code is life', slug: 'coding' },
                { description: 'FOOTIE!', slug: 'football' },
                { description: 'Hey good looking, what you got cooking?', slug: 'cooking' }
            ]))
        })
    });

    it('should handle 404 for incorrect paths', (done) => {
        request(app)
          .get('/api/invalidpath')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
});