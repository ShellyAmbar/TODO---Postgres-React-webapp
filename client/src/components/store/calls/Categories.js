const getCategories = async ({user_id}) => {
  return fetch(`http://localhost:5000/api/categories/:${user_id}`);
};

const addCategory = async ({body}) => {
  return fetch("http://localhost:5000/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
const removeCategory = async ({body}) => {
  return fetch(`http://localhost:5000/categories`, {
    method: "DELETE",
    body: JSON.stringify(body),
  });
};

export {getCategories, addCategory, removeCategory};
