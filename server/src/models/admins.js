const db = require("./../db");

const T_USERS = "users";
const T_ADMINS = "admins";

const createAdmin = async (adminData) => {
  return db(T_ADMINS).insert(adminData, "admin_id");
};

const readAdmin = (params = {}) => {
  return db(T_ADMINS)
    .where(params)
    .select({
      adminId: "admin_id",
      adminDisplayname: "admin_displayname",
      adminUserId: "admin_user_id",
      userId: "user_id",
      userUsername: "user_username",
      userPassword: "user_password",
      userUserType: "user_user_type_id",
    })
    .join(T_USERS, `${T_USERS}.user_id`, "=", `${T_ADMINS}.admin_user_id`);
};

const update = (adminId, adminData) => {
  return db(T_ADMINS).where({ admin_id: adminId }).update({ adminData });
};

const remove = (adminId) => {
  return db(T_ADMINS).where({ admin_id: adminId }).del();
};

module.exports = {
  createAdmin,
  readAdmin,
  update,
  remove,
};
