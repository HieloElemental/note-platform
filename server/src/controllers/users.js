const usersService = require("../models/users");

const { getPfp } = require("../utils/pfp");
const { httpError } = require("../helpers/handleError");

const getUserData = async (req, res) => {
  try {
    const userData = await usersService.getUserData(req.id);
    const pfp = await getPfp(req.id);
    return res.status(200).json({ userData, pfp });
  } catch (e) {
    return httpError(res, e);
  }
};

module.exports = { getUserData };
