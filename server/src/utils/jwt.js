const jwt = require("jsonwebtoken");

const generateAccessToken = (id, role) => {
  try {
    return jwt.sign({ id, role }, process.env.TOKEN_SECRET, {
      expiresIn: "4h",
    });
  } catch (err) {
    return new Error(`Error! Something went wrong. message: ${err.message}`);
  }
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "no token provided" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
    if (err) return res.sendStatus(403);

    req.id = decodedToken.id;
    req.role = decodedToken.role;

    next();
  });
}

module.exports = {
  generateAccessToken,
  authenticateToken,
};
