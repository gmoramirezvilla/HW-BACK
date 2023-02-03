const client = require('./index.js');

module.exports.queries = {
    createSchema: () => {
      client.query(`CREATE TABLE IF NOT EXISTS users(
        email varchar UNIQUE,
        password varchar,
        )`),
      client.query(`CREATE TABLE IF NOT EXISTS wishlist(
        email varchar,
        title varchar,
        id varchar
      )`)
  }
}

