const express = require("express");
const router = express.Router();
const service = require("./../models/admins");

const { generateAccessToken, authenticateToken } = require("./../utils/jwt");
const { isValidString } = require("./../utils/isValidValue");

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
    const {
      adminDisplayname: admin_displayname,
      userUsername: user_username,
      userPassword: user_password,
    } = req.body;
    const fieldsToValidate = [admin_displayname, user_username, user_password];
    const isValidFields = fieldsToValidate.every(isValidString);

    if (!isValidFields) {
      return res.status(400).json({
        error: "Ommited Fields Or Invalid Characters In Input Fields",
      });
    }

    const admin = await service.create({
      admin_displayname,
      user_username,
      user_password,
    });
    return res.status(201).json(admin);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

router.get("/all", authenticateToken(["admin"]), list);
router.get("/create", authenticateToken(["admin"]), create);

module.exports = router;
