const { selectArticleById } = require('../models/articles.models');

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then((article) => {
      if (article) {
        res.status(200).send({ article });
      } else {
        res.status(404).send({ msg: 'Article not found' });
      }
    })
    .catch(next);
};

const getAllArticles = (req, res, next) => {
    selectAllArticles()
      .then(articles => {
        res.status(200).send({ articles });
      })
      .catch(next);
  };

module.exports = {getArticleById, getAllArticles}