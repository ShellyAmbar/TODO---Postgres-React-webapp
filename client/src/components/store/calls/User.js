const removeUser = async (body) => {
  return fetch(`http://localhost:5000/api/user`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
  });
};

export {removeUser};
