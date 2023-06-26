const express = require("express");
const { isValidString } = require("../utils/isValidValue");
const { generateAccessToken } = require("../utils/jwt");
const usersService = require("../models/users");

const router = express.Router();

const login = async (req, res) => {
  try {
    const { userUsername: user_username, userPassword: user_password } =
      req.body;
    const fieldsToValidate = [user_username, user_password];
    const isValidFields = fieldsToValidate.every(isValidString);

    if (!isValidFields) {
      return res.status(400).json({
        error: "Ommited Fields Or Invalid Characters In Input Fields",
      });
    }
    const user = await usersService.login({ user_username, user_password });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid Credentials, user not found" });
    }

    console.log(user.userId, user.userTypeName);
    const token = generateAccessToken(user.userId, user.userTypeName);

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

router.post("/", login);

module.exports = router;
