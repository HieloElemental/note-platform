const jwt = require("jsonwebtoken");

const generateAccessToken = (id, role) => {
  try {
    return jwt.sign({ id: id, role: role }, process.env.TOKEN_SECRET, {
      expiresIn: "4h",
    });
  } catch (err) {
    return new Error(`Error! Something went wrong. message: ${err.message}`);
  }
};

const authenticateToken = (requiredRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
      return res.status(401).send({ error: "no token provided" });

    try{
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
        if (err) return res.status(403);
        console.log(requiredRoles, decodedToken.role.toString())
        if (!requiredRoles.includes(decodedToken.role))
        return res.status(401).send({ error: "token role not allowed" });
        
        req.id = decodedToken.id;
        req.role = decodedToken.role;
        
        next();
      });
    }catch (err){
      return res.status(400).send({ err });
    }
  };
};

module.exports = {
  generateAccessToken,
  authenticateToken,
};
