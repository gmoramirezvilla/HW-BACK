const router = require("express").Router();
const axios = require("axios");
const db = require('../database/helpers');

router.get("/", (req, res) => {
  let options = {
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=bookname&startIndex=0&maxResults=20',
    headers: {
      "content-type": "application/json"
    }
  };
  axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err)
    })
})

router.get("/search", (req, res) => {
  let options = {
    method: "GET",
    url: `https://www.googleapis.com/books/v1/volumes?`,
    headers: {
      "content-type": "application/json"
    },
    params: {
      q: req.query.q,
      startIndex: 0,
      maxResults: 20
    }
  }
  axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err)
    })
})

router.post("/wishlist", (req, res) => {
  db.addWishlistItem(req.body, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  })
})

router.post("/wishlist/items", (req, res) => {
  db.getWishlist(req.body, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  })
})

router.delete("/wishlist", (req, res) => {
  db.deleteWishlistItem(req.body, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  })
})

module.exports = router;