const db = require("../config/db");
const adminsService = require("./admins");
const staffService = require("./staff");

const T_USERS = "users";
const T_USER_TYPES = "user_types";

const findByUsername = async (user_username) => {
  return db(T_USERS)
    .select({
      id: "id",
      username: "username",
      staffId: "staff_id",
    })
    .where({ user_username: user_username })
    .join(
      T_USER_TYPES,
      `${T_USER_TYPES}.user_type_id`,
      "=",
      `${T_USERS}.user_user_type_id`
    )
    .first();
};

const findByUserId = async (id) => {
  return db(T_USERS)
    .select({
      id: "id",
      username: "username",
      staffId: "staff_id",
      enrollmentId: "enrollment_id",
      password: "user_password",
    })
    .where({ id })
    .first();
};

const getStaffUserData = async (id) => {
  try {
    let userData = {};
    await db.transaction(async (trx) => {
      const user = await findByUserId(id);
      const staff = await staffService.findStaffByUserId(user.id);
      userData = { ...staff, ...user };
    });

    return userData;
  } catch (error) {
    throw error;
  }
};

const login = async ({ reqUsername }) => {
  return db(T_USERS)
    .select({
      id: "id",
      username: "username",
      staffId: "staff_id",
      enrollmentId: "enrollment_id",
      password: "user_password",
    })
    .where({ username: reqUsername })
    .first();
};

const createUser = async (userData) => {
  return db(T_USERS).insert(userData, "user_id");
};

module.exports = {
  findByUsername,
  getStaffUserData,
  createUser,
  login,
};
