const signup = async ({body}) => {
  return fetch("http://localhost:5000/api/user/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},

    body: JSON.stringify(body),
  });
};

const login = async ({body}) => {
  return fetch("http://localhost:5000/api/user/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},

    body: JSON.stringify(body),
  });
};

export {signup, login};
