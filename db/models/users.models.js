const db = require('../connection')

const fetchAllUsers = () => {
    const queryStr = `SELECT username, name, avatar_url FROM users;`
    return db.query(queryStr).then((result) => {
        return result.rows;
    })
}

module.exports = { fetchAllUsers }