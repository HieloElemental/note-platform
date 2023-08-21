const usersService = require("../models/users");

const { httpError } = require("../helpers/handleError");
const { isValidString } = require("../utils/isValidValue");
const { getPfp } = require("../utils/pfp");
const generateAccessToken = require("../helpers/generateAccessToken");
const generateRefreshToken = require("../helpers/generateRefreshToken");
const { compare } = require("bcryptjs");

const loginCtrl = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (![username, password].every(isValidString)) {
      return res.status(400).json({
        error: "Campos Vacíos O Carácteres Inválidos En Algún Campo",
      });
    }

    const logedUser = await usersService.login({ reqUsername: username });

    if (!logedUser) {
      return res
        .status(401)
        .json({ error: "Credenciales Inválidas, Usuario No Encontrado" });
    }

    const { password: hashedPassword, id, staffId, enrollmentId } = logedUser;
    const isStaff = Boolean(staffId);
    const userReferenceId = staffId || enrollmentId;

    if (!(await compare(password, hashedPassword))) {
      return res
        .status(401)
        .json({ error: "Credenciales Invalidas! Contraseña Incorrecta" });
    }

    const token = generateAccessToken({
      id,
      username,
      isStaff,
      userReferenceId,
    });
    const user = { id, isStaff, userReferenceId, username };

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
