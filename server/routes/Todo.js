const TodoController = require("../controllers/Todo");
const authentication = require("../middlewares/authenticate");
const express = require("express");
const router = express.Router();
//create todo
router.post("/:userId", authentication, TodoController.setTodo);
//get all todo
router.get("/", authentication, TodoController.getTodos);

//get todo
router.get("/:id", authentication, TodoController.getTodo);
//update todo
router.put("/:id", authentication, TodoController.updateTodo);

//delete todo

router.delete("/:id", authentication, TodoController.deleteTodo);
module.exports = router;
