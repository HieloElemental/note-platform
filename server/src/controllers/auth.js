const usersService = require("../models/users");
const staffService = require("../models/staff");

const {
  handleBadRequest,
  handleServerError,
  handleUnauthorized,
} = require("../helpers/handleError");
const { isValidString } = require("../utils/isValidValue");
const { getPfp } = require("../utils/pfp");
const generateAccessToken = require("../helpers/generateAccessToken");
const generateRefreshToken = require("../helpers/generateRefreshToken");
const { compare } = require("bcryptjs");

const loginCtrl = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!isValidInput(username, password)) {
      return handleBadRequest(
        res,
        "Campos Vacíos O Carácteres Inválidos En Algún Campo"
      );
    }

    const loggedUser = await usersService.login({ reqUsername: username });

    if (!loggedUser) {
      return handleUnauthorized(res, "Credenciales Inválidas!");
    }

    const { password: hashedPassword, id, staffId, enrollmentId } = loggedUser;
    const isStaff = Boolean(staffId);
    const userReferenceId = staffId || enrollmentId;

    if (!(await compare(password, hashedPassword))) {
      return handleUnauthorized(res, "Credenciales Invalidas!");
    }

    let extraInfo = {};

    if (isStaff) {
      extraInfo = await getStaffInfo(id);
      if (!extraInfo) {
        return handleUnauthorized(res, "No Encontrada información del usuario");
      }
    } else {
      // Handle non-staff user (e.g., enrollment)
      // const loggedEnrollment = await true; //TODO: make the enrollment model
    }

    const user = { id, isStaff, userReferenceId, username };
    const token = await generateAccessToken({ ...user, ...extraInfo });

    return res.status(200).json({ ...token, user });
  } catch (error) {
    return handleServerError(res, error);
  }
};

const refreshTokenCtrl = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return handleBadRequest(req, "No refresh token provided");
    }

    const accessToken = generateRefreshToken(refreshToken);

    if (!accessToken) {
      return handleUnauthorized(res, "Invalid or expired refresh token");
    }

    return res.status(200).json({ accessToken });
  } catch (error) {
    return handleServerError(res, error);
  }
};

const isValidInput = (username, password) => {
  return [username, password].every(isValidString);
};

const getStaffInfo = async (userId) => {
  const staffInfo = await staffService.findStaffByUserId(userId);
  return staffInfo;
};

module.exports = { loginCtrl, refreshTokenCtrl };
