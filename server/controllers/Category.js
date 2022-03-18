const getCategories = async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM categories");

    res.json(allCategories.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const {id} = req.params;

    const todo = await pool.query(
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
    const {name} = req.body;
    const newCategory = await pool.query(
      "INSERT INTO categories (name) VALUES($1) RETURNING *",
      [name]
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
