const router = require("express").Router();
const  { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { users } = require("../database");
const db = require('../database/helpers');

require("dotenv").config({path:"./env"});

router.post("/signup", [
  check("email", "Invalid email").isEmail(),
  check("password", "Password must be at least 6 chars long").isLength({
    min: 6,
  }),
],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    db.getEmail({email}, (err, data) => {
      if (data) {
        return res.status(200).json({
          errors: [
            {
              email: user.email,
              msg: "The user already exists"
            }
          ]
        })
      }
    })

    const salt = await bcrypt.genSalt(10);
    console.log("salt:", salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password:", hashedPassword);

    await db.addUser({email, password: hashedPassword}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })

    const accessToken = await JWT.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET || "SECRET",
      {
        expiresIn: "3000s"
      }
    );

    res.json({
      accessToken,
      email
    });
  }
)

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let hashedPassword;
  let isMatch;

  await db.getUser({email}, async (err, data) => {
    if (data) {
      hashedPassword = data[0].password;
      isMatch = await bcrypt.compare(password, hashedPassword, async (err, result) => {
        if (!result) {
          return res.status(401).json({
            errors: [
              {
                msg: "Email or password is invalid"
              }
            ]
          })
        } else {
          const accessToken = await JWT.sign(
            { email },
            process.env.ACCESS_TOKEN_SECRET || "SECRET",
            {
              expiresIn: "3000s"
            }
          );
          return res.json({
            accessToken,
            email
          });
        }
      });
    }
  })
})

module.exports = router;