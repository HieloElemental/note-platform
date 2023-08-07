const jwt = require("jsonwebtoken");

const generateRefreshToken = (refreshToken) => {
  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const { id, role } = decodedToken;

    const accessToken = jwt.sign(
      { id: id, role: role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return accessToken;
  } catch (err) {
    return null;
  }
};

module.exports = generateRefreshToken;
