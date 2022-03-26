const signup = async ({body}) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: headers,

    body: JSON.stringify(body),
  });
};

const login = async ({body}) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: headers,

    body: JSON.stringify(body),
  });
};

const getUserToken = ({refreshToken}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer" + refreshToken,
  };

  return fetch("http://localhost:5000/api/auth/refresh-token", {
    method: "POST",
    body: {refreshToken: refreshToken},
    headers: headers,
  });
};

export {signup, login, getUserToken};
