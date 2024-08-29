const request = require('supertest')
const app = require('../app')
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
    
    it('should respond with a 404 error when given an invalid article ID', () => {
        return request(app)
          .get('/api/articles/999999')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('Article not found');
          });
      });
    
    it('should respond with the correct article object and comments sorted by most recent first', () => {
        return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({ body }) => {
                expect(Array.isArray(body.comments)).toBe(true);
                if (body.comments.length > 0) {
                    body.comments.forEach(comment => {
                        expect(comment).toHaveProperty('comment_id', expect.any(Number));
                        expect(comment).toHaveProperty('author', expect.any(String));
                        expect(comment).toHaveProperty('body', expect.any(String));
                        expect(comment).toHaveProperty('created_at', expect.any(String));
                        expect(comment).toHaveProperty('votes', expect.any(Number));
                    });
                    for (let i = 0; i < body.comments.length - 1; i++) {
                        const currentDate = new Date(body.comments[i].created_at).getTime();
                        const nextDate = new Date(body.comments[i + 1].created_at).getTime();
                        expect(currentDate).toBeGreaterThanOrEqual(nextDate);
                    }
                }
            });
    });
});

describe('PATCH /api/articles/:article_id', () => {
    it('should incriment the article votes and respond with the updated article', () => {
        return request(app)
            .get('/api/articles/1')
            .then(({ body }) => {
                const initialVotes = body.article.votes;
                return request(app)
                    .patch('/api/articles/1')
                    .send({ inc_votes: 1 })
                    .expect(200)
                    .then(({ body }) => {
                        expect(body.article).toHaveProperty('article_id', 1);
                        expect(body.article.votes).toBe(initialVotes + 1);
                    });
            });
    });

    it('should decrement the article votes and respond with the updated article', () => {
        return request(app)
            .get('/api/articles/1')
            .then(({ body }) => {
                const initialVotes2 = body.article.votes;
                return request(app)
                .patch('/api/articles/1')
                .send({ inc_votes: -1 })
            .expect(200)
            .then(({ body }) => {
                expect(body.article).toHaveProperty('article_id', 1);
                expect(body.article.votes).toBe(initialVotes2 - 1)
            });
        })
    });

    it('should add multiple votes to the article and respond with the updated article', () => {
        return request(app)
            .get('/api/articles/1')
            .then(({ body }) => {
                const initialVotes = body.article.votes;
                return request(app)
                    .patch('/api/articles/1')
                    .send({ inc_votes: 100 })
                    .expect(200)
                    .then(({ body }) => {
                        expect(body.article).toHaveProperty('article_id', 1);
                        expect(body.article.votes).toBe(initialVotes + 100);
                    });
            });
    });

    it('should deduct multiple votes to the article and respond with the updated article', () => {
        return request(app)
            .get('/api/articles/1')
            .then(({ body }) => {
                const initialVotes2 = body.article.votes;
                return request(app)
                .patch('/api/articles/1')
                .send({ inc_votes: -1 })
            .expect(200)
            .then(({ body }) => {
                expect(body.article).toHaveProperty('article_id', 1);
                expect(body.article.votes).toBe(initialVotes2 - 1)
            });
        })
    });

    it('should respond with a 404 error if the article ID does not exist', () => {
        return request(app)
            .patch('/api/articles/999999')
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Article not found');
            });
    });


});
