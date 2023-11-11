const db = require("../config/db");

const T_POSITIONS = "positions";

const listPositions = () => {
  try {
    return db(T_POSITIONS).select({
      id: `${T_POSITIONS}.id`,
      positionName: `${T_POSITIONS}.position_name`,
    });
  } catch (error) {}
};

module.exports = {
  listPositions,
};
