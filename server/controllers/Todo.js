const {pool} = require("../databae/dbconfig");

const setTodo = async (req, res, next) => {
  try {
    const {user_id, description, category} = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (category,description) VALUES($1, $2) RETURNING *",
      [category, description]
    );

    console.log("todo_id", newTodo.rows[0].todo_id);
    const todo_id = newTodo.rows[0].todo_id;
    //find role id
    const role = await pool.query("SELECT * FROM role WHERE name = $1", [
      "Admin",
    ]);
    const role_id = role.rows[0].role_id;

    const newUserTodo = await pool.query(
      "INSERT INTO userTodo (user_id,todo_id,rol_id) VALUES($1, $2, $3) RETURNING *",
      [user_id, todo_id, role_id]
    );

    res.json({todo: newTodo.rows[0], usertodo: newUserTodo.rows[0]});
  } catch (err) {
    console.error(err.message);
  }
};

const getTodos = async (req, res) => {
  try {
    const {user_id} = req.body;
    const allTodos = await pool.query(
      "SELECT * FROM todo INNER JOIN SELECT * FROM userTodo WHERE user_id = $1 ON todo.todo_id = userTodo.todo_id",
      [user_id]
    );

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getTodo = async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updateTodo = async (req, res) => {
  try {
    const {id, description, category} = req.body;

    const todo = await pool.query(
      "UPDATE todo SET description = $1, category = $2 WHERE todo_id = $3",
      [description, category, id]
    );

    res.json("todo was updated");
  } catch (err) {
    console.error(err.message);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const {id} = req.body;

    const todo = await pool.query("DELETE FROM todo  WHERE todo_id = $1", [id]);
    const usertodo = await pool.query(
      "DELETE FROM userTodo  WHERE todo_id = $1",
      [id]
    );

    res.json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {setTodo, getTodos, getTodo, updateTodo, deleteTodo};
