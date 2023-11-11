const adminsService = require("../models/admins");
const adminUsersService = require("../models/adminUsers");

const {
  handleServerError,
  handleBadRequest,
} = require("../helpers/handleError");
const { isValidString } = require("../utils/isValidValue");

const list = async (req, res) => {
  try {
    const adminList = await adminsService.readAdmin();
    return res.status(200).json(adminList);
  } catch (e) {
    return httpError(res, e);
  }
};

const create = async (req, res) => {
  try {
    const {
      adminDisplayName: admin_display_name,
      userUsername: user_username,
      userPassword: user_password,
    } = req.body;
    const fieldsToValidate = [admin_displayName, user_username, user_password];
    const isValidFields = fieldsToValidate.every(isValidString);

    if (!isValidFields) {
      return handleBadRequest(
        req,
        "Campos Vacíos O Caracteres Inválidos En Algún Campo"
      );
    }

    const admin = await adminUsersService.createUserAdmin({
      admin_display_name,
      user_username,
      user_password,
    });
    return res.status(201).json(admin);
  } catch (error) {
    return handleServerError(res, error);
  }
};

module.exports = {
  list,
  create,
};
