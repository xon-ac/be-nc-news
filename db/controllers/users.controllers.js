const { fetchAllUsers } = require('../models/users.models');

const getAllUsers = (req, res, next) => {
    fetchAllUsers()
        .then((users) => {
            res.status(200).send({ users });
        })
        .catch(next);
};

module.exports = { getAllUsers };