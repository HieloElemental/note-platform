const jwt = require("jsonwebtoken");

const generateAccessToken = (id, role) => {
  try {
    return jwt.sign({ id: id, role: role }, process.env.TOKEN_SECRET, {
      expiresIn: "4h",
    });
  } catch (err) {
    return new Error(err.message);
  }
};

module.exports = generateAccessToken;
