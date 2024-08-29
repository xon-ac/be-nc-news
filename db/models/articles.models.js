const db = require('../connection');

const selectArticleById = (articleId) => {
  return db.query(`
    SELECT * FROM articles
    WHERE article_id = $1
  `, [articleId])
    .then(result => result.rows[0]);
};

const selectAllArticles = () => {
    return db.query(`
    SELECT 
    articles.author,
    articles.title,
    articles.article_id,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
    `)
    .then(result => result.rows);
  };

const selectCommentsByArticleId = (articleId) => {
    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
    `, [articleId])
      .then(({ rows }) => rows);
};

const insertComment = (articleId, username, body) => {
    return db.query(`
    INSERT INTO comments (article_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [articleId, username, body])
      .then(({ rows }) => rows[0]);
  };

module.exports = {
    selectArticleById,
    selectAllArticles,
    selectCommentsByArticleId,
    insertComment

};