const db = require('../connection');

const selectArticleById = (articleId) => {
  return db.query(`
    SELECT * FROM articles
    WHERE article_id = $1
  `, [articleId])
    .then(result => result.rows[0]);
};

module.exports = { selectArticleById };