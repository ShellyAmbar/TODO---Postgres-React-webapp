const removeUser = async ({body, token}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + token,
  };
  return fetch(`http://localhost:5000/api/user`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(body),
  });
};

export {removeUser};
