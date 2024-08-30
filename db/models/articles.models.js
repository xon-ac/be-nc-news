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

const updateArticleVotes = (articleId, incVotes) => {
    return db.query(`
    UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *;
    `, [articleId, incVotes])
    .then(result => result.rows[0]);
};

const fetchAllArticles = (sort_by = 'created_at', order = 'desc', topic) => {
  const validSortColumns = ['created_at', 'title', 'author', 'votes', 'article_id'];
  const validOrders = ['asc', 'desc'];

  if (!validSortColumns.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: 'Invalid sort_by column' });
  }

  if (!validOrders.includes(order)) {
      return Promise.reject({ status: 400, msg: 'Invalid order query' });
  }

  let queryStr = `
      SELECT articles.*, COUNT(comments.comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
  `;

  if (topic) {
      queryStr += ` WHERE articles.topic = $1`;
  }

  queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;

  return db.query(queryStr, topic ? [topic] : []).then((result) => {
      return result.rows;
  });
};

module.exports = {
    selectArticleById,
    selectAllArticles,
    selectCommentsByArticleId,
    insertComment,
    updateArticleVotes,
    fetchAllArticles 

};