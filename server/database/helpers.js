const pool = require('./index.js');

const addUser = async (data, callback) => {
  const client = await pool.connect();
  let { email, password } = data;

  let insert = `
    INSERT INTO users (
      email,
      password
    )
    VALUES ($1, $2)
  `

  client.query(insert, [ email, password ])
      .then(results => callback(null, results.rows))
      .catch(err => callback(err))
}

const getUser = async (data, callback) => {
  const client = await pool.connect();
  let { email } = data;
  console.log(data);

  let select = `
    SELECT *
    FROM users
    WHERE email = '${email}'
  `

  client.query(select)
    .then(results => {
      if (results.rows.length) {
        callback(null, results.rows);
      } else {
        callback(null, false);
      }
    })
}

const getEmail = async (data, callback) => {
  const client = await pool.connect();
  let { email } = data;

  let select = `
    SELECT *
    FROM users
    WHERE email = '${email}'
  `

  await client.query(select)
    .then(results => {
      if (results.rows.length) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    })
    .catch(err => callback(err));
}

const addWishlistItem = async (data, callback) => {
  const client = await pool.connect();

  let { email, title, id } = data.data;

  let insert = `
    INSERT INTO wishlist (
      email,
      title,
      id
    )
    VALUES ($1, $2, $3)
  `

  client.query(insert, [ email, title, id ])
      .then(results => {
        callback(null, results.row)
      })
      .catch(err => callback(err))
}

const getWishlist = async (data, callback) => {
  const client = await pool.connect();
  let { email } = data.data;

  let select = `
    SELECT * FROM wishlist
    WHERE email = '${email}'
  `

  client.query(select)
    .then(results => {
      callback(null, results.rows);
    })
    .catch(err => callback(err));
}

const deleteWishlistItem = async (data, callback) => {
  const client = await pool.connect();
  let { email, id } = data

  let remove = `
    DELETE FROM wishlist
    WHERE email = '${email}' AND id = '${id}'
  `

  client.query(remove)
    .then(results => {
      callback(null, results.rows)
    })
    .catch(err => {callback(err)});
}

module.exports = { addUser, getUser, getEmail, addWishlistItem, getWishlist, deleteWishlistItem };