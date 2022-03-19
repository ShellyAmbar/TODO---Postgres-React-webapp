import jwt from "jsonwebtoken";

const jwtTokens = ({user_id, user_name, user_email}) => {
  const user = {user_id, user_name, user_email};
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPITATION_PERIOD,
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPITATION_PERIOD,
  });

  return {accessToken, refreshToken};
};

module.exports = {
  jwtTokens,
};
