import React, {Fragment, useEffect, useState} from "react";
import EditToDo from "../EditToDo";
import {getTodos, removeTodo} from "../store/calls/Todos";

function ListTodos() {
  const [todos, setTodos] = useState([]);
  const getAllTodos = async () => {
    try {
      const user_id = "";
      const response = await getTodos({user_id});
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getAllTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      let body = {
        id,
      };
      const response = await removeTodo({body});
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const reload = () => window.location.reload();
  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.category}</td>
              <td>{todo.description}</td>
              <td>
                <EditToDo todo={todo} onEditComplete={reload} />
              </td>
              <td>
                <button
                  onClick={() => deleteTodo(todo.todo_id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default ListTodos;
