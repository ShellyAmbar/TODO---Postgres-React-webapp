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
    const {description} = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
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
    const {description} = req.body;

    const todo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
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

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
