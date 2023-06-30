const adminsService = require("../models/admins");
const adminUsersService = require("../models/adminUsers");

const { httpError } = require("../helpers/handleError");
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
      adminDisplayname: admin_displayname,
      userUsername: user_username,
      userPassword: user_password,
    } = req.body;
    const fieldsToValidate = [admin_displayname, user_username, user_password];
    const isValidFields = fieldsToValidate.every(isValidString);

    if (!isValidFields) {
      return res.status(400).json({
        error: "Campos Vacíos O Carácteres Inválidos En Algún Campo",
      });
    }

    const admin = await adminUsersService.createUserAdmin({
      admin_displayname,
      user_username,
      user_password,
    });
    return res.status(201).json(admin);
  } catch (e) {
    return httpError(res, e);
  }
};

module.exports = {
  list,
  create,
};
