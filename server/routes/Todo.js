const TodoController = require("../controllers/Todo");
const authentication = require("../middlewares/authenticate");
//create todo
app.post("/:userId", authentication, TodoController.setTodo);
//get all todo
app.get("/", authentication, TodoController.getTodos);

//get todo
app.get("/:id", authentication, TodoController.getTodo);
//update todo
app.put("/:id", authentication, TodoController.updateTodo);

//delete todo

app.delete("/:id", authentication, TodoController.deleteTodo);
