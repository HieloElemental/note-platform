const staffService = require("../models/staff");
const { handleServerError } = require("../helpers/handleError");

const listStaff = async (req, res) => {
  try {
    const staff = await staffService.listStaff();
    res.status(200).json(staff);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = { listStaff };
