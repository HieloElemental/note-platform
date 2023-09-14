const usersService = require("../models/users");

const { getPfp } = require("../utils/pfp");
const { httpError } = require("../helpers/handleError");

const getUserData = async (req, res) => {
  try {
    let userData;
    if (req.body.isStaff) {
      userData = await usersService.getStaffUserData(req.body.id);
    }
    const pfp = await getPfp(req.body.id);
    return res.status(200).json({ userData, pfp });
  } catch (e) {
    return httpError(res, e);
  }
};

module.exports = { getUserData };
