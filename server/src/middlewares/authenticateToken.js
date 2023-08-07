const jwt = require("jsonwebtoken");

const authenticateToken = (requiredRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
      return res.status(401).send({ error: "no token provided" });

    try {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(401).send({ error: "su token ha expirado" });
          } else {
            return res.status(403).send({ error: "invalid token" });
          }
        }

        if (requiredRoles && !requiredRoles.includes(decodedToken.role))
          return res.status(401).send({ error: "token role not allowed" });

        req.id = decodedToken.id;
        req.role = decodedToken.role;

        next();
      });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  };
};

module.exports = authenticateToken;
