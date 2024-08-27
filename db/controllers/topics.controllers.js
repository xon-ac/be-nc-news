const {selectTopics} = require('../models/topics.models')

const getAllTopics = (req, res, next) => {
    selectTopics().then((topicsResponse) => {
        res.status(200).send({ topics: topicsResponse });
      });
    };
  

module.exports = { getAllTopics }