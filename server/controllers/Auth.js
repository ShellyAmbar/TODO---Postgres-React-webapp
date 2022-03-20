const bcrypt = require("bcrypt");
const {pool} = require("../databae/dbconfig");
const jwt = require("jsonwebtoken");
import {jwtTokens} from "../utils/jwt-helper";

const register = async (req, res) => {
  try {
    let {name, email, password} = req.body;
    console.log({name, email, password});
    let hashedPassword = await bcrypt.hash(password, 10);

    let users = pool.query("SELECT * FROM users WHERE email =$1", [email]);
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
    let {name, email, password} = req.body;
    console.log({name, email, password});

    let users = await pool.query("SELECT * FROM users WHERE email =$1", [
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
    if (!validPassword)
      return res.status(401).json({
        error: "Password is incorrect.",
      });

    let tokens = jwtTokens(users.rows[0]);
    res.json(tokens);
  } catch (err) {
    return res.status(401).json({
      error: err.message,
    });
  }
};

const logout = async (req, res) => {};

export {register, login};
