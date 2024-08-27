const topics = require('../../db/connection')

exports.selectTopics = (req, res) => {
    return ("SELECT * FROM topics").then(({rows}) => {
        return rows
    })
    const queryArr = []
}

module.exports = {getTopics}

