const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
  try {
    const accessToken = jwt.sign(data, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      { id: id },
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
