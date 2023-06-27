const usersService = require("../models/users");

const { httpError } = require("../helpers/handleError");
const { isValidString } = require("../utils/isValidValue");
const { generateAccessToken } = require("../utils/jwt");
const { compare } = require("bcryptjs");

const loginCtrl = async (req, res) => {
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

    const user = await usersService.login({ user_username });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid Credentials, user not found" });
    }

    const checkPassword = await compare(user_password, user.userPassword);
    if (!checkPassword) {
      return res
        .status(401)
        .json({ error: "Invalid Credentials, wrong password" });
    }

    const token = generateAccessToken(user.userId, user.userTypeName);

    return res.status(200).json({ token, user });
  } catch (e) {
    return httpError(res, e);
  }
};

module.exports = { loginCtrl };
