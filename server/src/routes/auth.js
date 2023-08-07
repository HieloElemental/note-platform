const express = require("express");
const router = express.Router();

const { loginCtrl, refreshTokenCtrl } = require("../controllers/auth");

router.post("/login", loginCtrl);

router.post("/refresh-token", refreshTokenCtrl);

module.exports = router;
