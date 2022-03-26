const bcrypt = require("bcrypt");
const {pool} = require("../databae/dbconfig");
const jwt = require("jsonwebtoken");
const {jwtTokens} = require("../utils/jwt-helper");

const register = async (req, res) => {
  try {
    let {name, email, password} = req.body;

    let hashedPassword = await bcrypt.hash(password, 10);

    let users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (users.rows.length > 0) {
      return res.status(401).json({
        error: "Email is incorrect.",
      });
    }
    let usersResult = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, hashedPassword]
    );
    return res.json({
      user: usersResult[0],
      message: "User added successfully.",
    });
  } catch (err) {
    return res.status(401).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let {email, password} = req.body;

    let users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (users.rows.length === 0) {
      return res.status(401).json({
        error: "Email is incorrect.",
      });
    }
    const validPassword = await bcrypt.compare(
      password,
      users.rows[0].password
    );
    if (!validPassword) {
      return res.status(401).json({
        error: "Password is incorrect.",
      });
    }

    let tokens = jwtTokens(users.rows[0]);

    res.json(tokens);
  } catch (err) {
    return res.status(401).json({
      error: err.message,
    });
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, decode) {
      if (err) {
        res.status(400).json({
          err,
        });
      } else {
        let token = jwt.sign(
          {name: decode.name},
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRE_TIME,
          }
        );

        res.status(200).json({
          message: "token refreshed successfully.",
          token,
          refreshToken,
        });
      }
    }
  );
};

const logout = async (req, res) => {};

module.exports = {register, login, refreshToken};
