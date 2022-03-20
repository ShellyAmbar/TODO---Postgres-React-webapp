const {pool} = require("../databae/dbconfig");
const getCategories = async (req, res) => {
  try {
    const {user_id} = req.body;
    const allUserCategories = await pool.query(
      "SELECT * FROM categories WHERE user_id = $1",
      [user_id]
    );

    res.json(allUserCategories.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const {id} = req.body;

    const category = await pool.query(
      "DELETE FROM categories  WHERE category_id = $1",
      [id]
    );

    res.json("category was deleted");
  } catch (err) {
    console.error(err.message);
  }
};

const addCategory = async (req, res) => {
  try {
    const {user_id, name} = req.body;
    const newCategory = await pool.query(
      "INSERT INTO categories (name, user_id) VALUES($1, $2) RETURNING *",
      [name, user_id]
    );

    res.json(newCategory.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getCategories,
  deleteCategory,
  addCategory,
};
