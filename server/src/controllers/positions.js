const positionService = require("../models/positions");
const { handleServerError } = require("../helpers/handleError");

const listPositions = async (req, res) => {
  try {
    const positions = await positionService.listPositions();
    return res.status(200).json(positions);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = { listPositions };
