const bcrypt = require("bcrypt");
const {pool} = require("../databae/dbconfig");
const removeUser = async (req, res) => {
  try {
    let {email, password} = req.body;
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

    let usersResult = await pool.query("DELETE FROM users WHERE email =$1", [
      email,
    ]);
  } catch (err) {
    return res.status(401).json({
      error: err.message,
    });
  }
};

module.exports = {removeUser};
