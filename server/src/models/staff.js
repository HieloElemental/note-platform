const db = require("../config/db");

const T_USERS = "users";
const T_STAFF = "staff";

const findStaffByUserId = (userId) => {
  return db(T_USERS)
    .where({ [`${T_USERS}.id`]: userId })
    .select({
      id: `${T_USERS}.id`,
      staffId: `${T_STAFF}.id`,
      staffFirstName: `${T_STAFF}.first_name`,
      positionId: `${T_STAFF}.position_id`,
    })
    .join(T_STAFF, `${T_STAFF}.id`, "=", `${T_USERS}.staff_id`)
    .first();
};

module.exports = {
  findStaffByUserId,
};
