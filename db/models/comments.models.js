const db = require('../connection');

const removeCommentById = (comment_id) => {
    return db.query(
        'DELETE FROM comments WHERE comment_id = $1 RETURNING *;',
        [comment_id]
    ).then(({ rows }) => {
        return rows[0];
    });
};

module.exports = {
    removeCommentById,
};