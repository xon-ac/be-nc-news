const { selectArticleById, insertComment, selectCommentsByArticleId } = require('../models/articles.models');

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then(article => {
      if (article) {
        res.status(200).send({ article });
      } else {
        res.status(404).send({ msg: 'Article not found' });
      }
    })
    .catch(next);
};

const getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  
  selectCommentsByArticleId(article_id)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const addCommentToArticle = (req, res, next) => {
    const { article_id } = req.params;
    const { author, body } = req.body;

    if (!author || !body) {
      return res.status(400).send({ msg: 'Missing required fields' });
    }

    insertComment(article_id, author, body)
        .then((comment) => {
            res.status(201).send({ comment });
        })
        .catch((err) => {
            next(err);
        });
};

module.exports = {
    getArticleById, 
    getArticleComments, 
    insertComment,
    addCommentToArticle
}