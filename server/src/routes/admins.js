const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const { list, create } = require("../controllers/admins");

const generateAccessToken = require("../helpers/generateAccessToken");

// TEMP: Start
/* Generate Token */
// Funtion for only for testing purposes
router.get("/token/:role", (req, res) => {
  try {
    const token = generateAccessToken("1", req.params.role);
    return res.send(token);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
// TEMP: End

router.get("/all", authenticateToken(["admin"]), list);
router.get("/create", authenticateToken(["admin"]), create);

module.exports = router;
