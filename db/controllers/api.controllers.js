const { selectApiEndpoints } = require('../models/api.models');

const getApiEndpoints = (req, res, next) => {
  selectApiEndpoints()
    .then((endpoints) => {
      res.status(200).send({ endpoints });
    })
    .catch(next);
};

module.exports = { getApiEndpoints };