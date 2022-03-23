const getTodos = async ({user_id}) => {
  return fetch(`http://localhost:5000/api/todos/${user_id}`);
};

const getTodo = async ({todo_id}) => {
  return fetch(`http://localhost:5000/api/todos/${todo_id}`);
};

const addTodo = async ({body}) => {
  return fetch("http://localhost:5000/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
const updateTodo = async ({body}) => {
  return fetch(`http://localhost:5000/api/todos`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},

    body: JSON.stringify(body),
  });
};

const removeTodo = async ({body}) => {
  return fetch(`http://localhost:5000/api/todos`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
  });
};

export {getTodo, getTodos, addTodo, removeTodo, updateTodo};
