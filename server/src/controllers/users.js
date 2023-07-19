const usersService = require("../models/users");

const { httpError } = require("../helpers/handleError");

const getUserData = async (req, res) => {
  try {
    const userData = await usersService.getUserData(req.id);
    return res.status(200).json({ userData });
  } catch (e) {
    return httpError(res, e);
  }
};

module.exports = { getUserData };
