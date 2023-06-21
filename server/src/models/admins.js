const db = require("./../db");
const T_ADMINS = "admins";

const cereate = (adminData) => {
  return db(T_ADMINS).insert(adminData);
};

const read = (params = {}) => {
  return db(T_ADMINS).where(params).select({
    adminId: "admin_id",
    adminDisplayname: "admin_displayname",
    adminUserId: "admin_user_id",
  });
};

const update = (adminId, adminData) => {
  return db(T_ADMINS).where({ admin_id: adminId }).update({ adminData });
};

const remove = (adminId) => {
  return db(T_ADMINS).where({ admin_id: adminId }).del();
};

module.exports = {
  cereate,
  read,
  update,
  remove,
};
