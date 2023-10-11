const express = require("express");
const router = express.Router();

const { listStaff } = require("../controllers/staff");

router.get("/list", listStaff);

module.exports = router;
