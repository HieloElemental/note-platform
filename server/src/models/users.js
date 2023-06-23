const db = require("./../db");
const T_USERS = "users";

const findByUsername = async (user_username) => {
  return db(T_USERS).where({ user_username: user_username }).first();
};

const createUser = async (userData) => {
  return db(T_USERS).insert(userData, "user_id");
};

module.exports = {
  findByUsername,
  createUser,
};
