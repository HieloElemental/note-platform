const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

const { getUserData } = require("../controllers/users");

router.get("/userData", authenticateToken(), getUserData);

module.exports = router;
