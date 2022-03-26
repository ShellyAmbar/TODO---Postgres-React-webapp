const getCategories = async ({user_id, token}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + token,
  };
  return fetch(`http://localhost:5000/api/categories/:${user_id}`, {
    headers: headers,
  });
};

const addCategory = async ({body, token}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + token,
  };
  return fetch("http://localhost:5000/categories", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
};
const removeCategory = async ({body, token}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + token,
  };
  return fetch(`http://localhost:5000/categories`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(body),
  });
};

export {getCategories, addCategory, removeCategory};
