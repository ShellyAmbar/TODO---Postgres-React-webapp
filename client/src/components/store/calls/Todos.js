const getTodos = async ({user_id, token}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + token,
  };
  return fetch(`http://localhost:5000/api/todos/${user_id}`, {
    headers: headers,
  });
};

const getTodo = async ({todo_id, token}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + token,
  };
  return fetch(`http://localhost:5000/api/todos/${todo_id}`, {
    headers: headers,
  });
};

const addTodo = async ({body, token}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + token,
  };
  return fetch("http://localhost:5000/api/todos", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
};
const updateTodo = async ({body, token}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + token,
  };
  return fetch(`http://localhost:5000/api/todos`, {
    method: "PUT",
    headers: headers,

    body: JSON.stringify(body),
  });
};

const removeTodo = async ({body, token}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + token,
  };
  return fetch(`http://localhost:5000/api/todos`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(body),
  });
};

export {getTodo, getTodos, addTodo, removeTodo, updateTodo};
