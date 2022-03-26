const jwt = require("jsonwebtoken");

const jwtTokens = ({id, name, email}) => {
  const user = {id, name, email};
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPITATION_PERIOD,
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPITATION_PERIOD,
  });

  return {accessToken, refreshToken};
};

module.exports = {jwtTokens};
