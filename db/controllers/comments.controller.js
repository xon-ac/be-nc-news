const { removeCommentById } = require('../models/comments.models');

const deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;

    removeCommentById(comment_id)
        .then((deletedComment) => {
            if (deletedComment) {
                res.status(204).send(); 
            } else {
                res.status(404).send({ msg: 'Comment not found' });
            }
        })
        .catch((err) => {
            if (err.code === '22P02') {
                res.status(400).send({ msg: 'Invalid comment ID' });
            } else {
                next(err);
            }
        });
};

module.exports = {
    deleteCommentById,
};