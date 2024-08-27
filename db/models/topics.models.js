    const db = require('../connection')

    const selectTopics = () => {
        let queryString = "SELECT * FROM topics";
        const queryArr = []

        return db.query(queryString).then((response) => {
            return response.rows;
          })
     }

module.exports = {selectTopics}