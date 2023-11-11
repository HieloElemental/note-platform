const jwt = require("jsonwebtoken");

const authenticateToken = (requiredModules) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
      return res.status(401).send({ error: "no token provided" });

    try {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res
              .status(401)
              .send({ error: "su token ha expirado", passwordAsking: true });
          } else {
            return res.status(403).send({ error: "invalid token" });
          }
        }

        if (decodedToken.isAdmin) {
          req.body = decodedToken;
          return next();
        }

        if (
          requiredModules &&
          !requiredModules.includes(decodedToken.positionAllowedModules)
        )
          return res.status(401).send({ error: "token role not allowed" });

        req.body = decodedToken;

        next();
      });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  };
};

module.exports = authenticateToken;
