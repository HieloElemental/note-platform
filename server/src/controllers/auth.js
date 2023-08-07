const usersService = require("../models/users");

const { httpError } = require("../helpers/handleError");
const { isValidString } = require("../utils/isValidValue");
const { getPfp } = require("../utils/pfp");
const generateAccessToken = require("../helpers/generateAccessToken");
const generateRefreshToken = require("../helpers/generateRefreshToken");
const { compare } = require("bcryptjs");

const loginCtrl = async (req, res) => {
  try {
    const { userUsername: user_username, userPassword: user_password } =
      req.body;
    const fieldsToValidate = [user_username, user_password];
    const isValidFields = fieldsToValidate.every(isValidString);

    if (!isValidFields) {
      return res.status(400).json({
        error: "Campos Vacíos O Carácteres Inválidos En Algún Campo",
      });
    }

    const logedUser = await usersService.login({ user_username });

    if (!logedUser) {
      return res
        .status(401)
        .json({ error: "Credenciales Inválidas, Usuario No Encontrado" });
    }

    const { userPassword, userId, userTypeName, userUsername } = logedUser;

    const checkPassword = await compare(user_password, userPassword);
    if (!checkPassword) {
      return res
        .status(401)
        .json({ error: "Credenciales Invalidas! Contraseña Incorrecta" });
    }

    const token = generateAccessToken(userId, userTypeName, userUsername);

    const user = {
      userId,
      userTypeName,
      userUsername,
    };

    return res.status(200).json({ ...token, user });
  } catch (e) {
    return httpError(res, e);
  }
};

const refreshTokenCtrl = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "No refresh token provided" });
    }

    const accessToken = generateRefreshToken(refreshToken);

    if (!accessToken) {
      return res
        .status(401)
        .json({ error: "Invalid or expired refresh token" });
    }

    return res.status(200).json({ accessToken });
  } catch (e) {
    return httpError(res, e);
  }
};

module.exports = { loginCtrl, refreshTokenCtrl };
