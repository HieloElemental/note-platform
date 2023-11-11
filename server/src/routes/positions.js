const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

const { listPositions } = require("../controllers/positions");

router.get("/list", authenticateToken(["staff"]), listPositions);

module.exports = router;
