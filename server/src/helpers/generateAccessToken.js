const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
  try {
    const accessToken = jwt.sign(data, process.env.TOKEN_SECRET, {
      expiresIn: "1m",
    });

    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = generateAccessToken;
