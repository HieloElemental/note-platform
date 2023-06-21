const express = require("express");
const { generateAccessToken, authenticateToken } = require("./../utils/jwt");
const router = express.Router();
const service = require("./../models/admins");

/*  Generate Token */
// !Temporal Start
// Funtion for only for testing purposes
router.get("/token", (req, res) => {
  const token = generateAccessToken("1", "admin");
  res.send(token);
});
// !Temporal End

/* Read All Admins */
const list = async (req, res) => {
  if (req.role != "admin") {
    return res
      .status(401)
      .json({ message: "You must be admin to perform this action" });
  }
  try {
    const adminList = await service.read();
    return res.status(200).json(adminList);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

router.get("/all", authenticateToken, list);

module.exports = router;
