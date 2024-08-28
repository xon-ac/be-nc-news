const request = require('supertest');
const app = require('../app');

const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api', () => {
  it('should respond with an object containing all API endpoints', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty('endpoints');
        expect(body.endpoints).toMatchObject({
          'GET /api': expect.any(Object),
          'GET /api/topics': expect.any(Object),
          // Add more endpoints 
        });
      });
  });

  it('should handle 404 for incorrect paths', () => {
    return request(app)
      .get('/api/invalidpath')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not Found');
      });
  });
});