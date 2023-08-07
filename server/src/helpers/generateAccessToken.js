const jwt = require("jsonwebtoken");

const generateAccessToken = (id, role) => {
  try {
    const accessToken = jwt.sign(
      { id: id, role: role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { id: id, role: role },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return { accessToken, refreshToken };
  } catch (err) {
    return new Error(err.message);
  }
};

module.exports = generateAccessToken;
