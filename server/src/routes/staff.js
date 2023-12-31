const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

const { listStaff } = require("../controllers/staff");

router.get("/list", authenticateToken(["staff"]), listStaff);

module.exports = router;
