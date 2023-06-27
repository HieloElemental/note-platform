const express = require("express");
const router = express.Router();

const { loginCtrl } = require("../controllers/auth");

router.post("/login", loginCtrl);

module.exports = router;
