const db = require("./../db");
const T_USERS = "users";
const T_USER_TYPES = "user_types";

const findByUsername = async (user_username) => {
  return db(T_USERS).where({ user_username: user_username }).first();
};

const login = async ({ user_username, user_password }) => {
  return db(T_USERS)
    .select({
      userId: "user_id",
      userUsername: "user_username",
      userPassword: "user_password",
      userUserTypeId: "user_user_type_id",
      userTypeId: "user_type_id",
      userTypeName: "user_type_name",
    })
    .where({ user_username, user_password })
    .join(
      T_USER_TYPES,
      `${T_USER_TYPES}.user_type_id`,
      "=",
      `${T_USERS}.user_user_type_id`
    )
    .first();
};

const createUser = async (userData) => {
  return db(T_USERS).insert(userData, "user_id");
};

module.exports = {
  findByUsername,
  createUser,
  login,
};
