const express = require("express");
const app = express();
let port = 5000;
const cors = require("cors");
const pool = require("./databae/db");

app.use(cors());
app.use(express.json());

//create todo
app.post("/todos", async (req, res) => {
  try {
    const {description, category} = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (category,description) VALUES($1, $2) RETURNING *",
      [category, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get todo
app.get("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {description, category} = req.body;

    const todo = await pool.query(
      "UPDATE todo SET description = $1, category = $2 WHERE todo_id = $3",
      [description, category, id]
    );

    res.json("todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;

    const todo = await pool.query("DELETE FROM todo  WHERE todo_id = $1", [id]);

    res.json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

// categories

//get categories
app.get("/categories", async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM categories");

    res.json(allCategories.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//delete category
app.delete("/categories/:id", async (req, res) => {
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
});
//add category
app.post("/categories", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
