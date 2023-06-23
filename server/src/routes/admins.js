const express = require("express");
const { generateAccessToken, authenticateToken } = require("./../utils/jwt");
const router = express.Router();
const service = require("./../models/admins");

// !Temporal Start
/*  Generate Token */
// Funtion for only for testing purposes
router.get("/token/:role", (req, res) => {
  try {
    const token = generateAccessToken("1", req.params.role);
    return res.send(token);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
// !Temporal End

/* Read All Admins */
const list = async (req, res) => {
  try {
    const adminList = await service.read();
    return res.status(200).json(adminList);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const create = async (req, res) => {
  try {
    const admin = await service.create(req.body);
    return res.status(201).json(admin);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

router.get("/all", authenticateToken(["admin"]), list);

module.exports = router;
