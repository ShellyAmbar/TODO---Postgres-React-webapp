const bcrypt = require("bcrypt");
const {pool} = require("../databae/dbconfig");
const jwt = require("jsonwebtoken");
//import {jwtTokens} from "../utils/jwt-helper";

const register = async (req, res) => {
  let {name, email, password} = req.body;
  console.log({name, email, password});
  let hashedPassword = await bcrypt.hash(password, 10);
  pool.query("SELECT * FROM users WHERE email =$1", [email], (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results.rows);
    if (results.rows.length > 0) {
      res.status(401).json({
        error: "Email is already registered with this email.",
      });
    } else {
      pool.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
        [name, email, hashedPassword],
        (err, results) => {
          if (err) {
            res.status(500).json({
              error: "Failed to insert user.",
            });
          }

          return res.json({
            message: "User added succesfully",
            token,
            refreshToken,
            user: results.rows[0],
          });
        }
      );
    }
  });
};

const login = async (req, res) => {
  let {name, email, password} = req.body;
  console.log({name, email, password});

  let users = await pool.query("SELECT * FROM users WHERE email =$1", [email]);

  if (users.rows.length === 0) {
    return res.status(401).json({
      error: "Email is incorrect.",
    });
  }
  const validPassword = await bcrypt.compare(password, users.rows[0].password);
  if (!validPassword)
    return res.status(401).json({
      error: "Password is incorrect.",
    });

  let user = await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
    [name, email, hashedPassword]
  );
};

module.exports = {
  register,
};
