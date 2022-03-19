const setTodo = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const {description, category} = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (category,description) VALUES($1, $2) RETURNING *",
      [category, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const getTodos = async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

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
};

const deleteTodo = async (req, res) => {
  try {
    const {id} = req.params;

    const todo = await pool.query("DELETE FROM todo  WHERE todo_id = $1", [id]);

    res.json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {setTodo, getTodos, getTodo, updateTodo, deleteTodo};
