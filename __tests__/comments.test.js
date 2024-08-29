const request = require('supertest');
const app = require('../app');
const testData = require('../db/data/test-data');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('POST /api/articles/:article_id/comments', () => {
    it('should add a new comment to the article and respond with the added comment', () => {
        return request(app)
            .post('/api/articles/1/comments')
            .send({ author: 'butter_bridge', body: 'Great article!' })
            .expect(201)
            .then(({ body }) => {
                expect(body.comment).toHaveProperty('comment_id');
                expect(body.comment).toHaveProperty('article_id', 1);
                expect(body.comment).toHaveProperty('author', 'butter_bridge');
                expect(body.comment).toHaveProperty('body', 'Great article!');
                expect(body.comment).toHaveProperty('created_at');
                expect(body.comment).toHaveProperty('votes', 0);
            });
    });

    it('should respond with a 400 error if required fields are missing', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ author: 'butter_bridge' })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Missing required fields');
          });
    });

    describe('DELETE /api/comments/:comment_id', () => {
        it('should delete the comment by comment_id and respond with status 204 and no content', () => {
            return request(app)
                .delete('/api/comments/1')
                .expect(204)
                .then(({ body }) => {
                    expect(body).toEqual({});
                });
        });
    })

    it('should respond with status 404 if the comment_id does not exist', () => {
        return request(app)
            .delete('/api/comments/999999') // Non-existent comment_id
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Comment not found');
            });
    });

    it('should respond with status 400 if the comment_id is invalid', () => {
        return request(app)
            .delete('/api/comments/not-a-valid-id') // Invalid comment_id
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Invalid comment ID');
            });
    });
})