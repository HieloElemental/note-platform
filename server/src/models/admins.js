const bd = require("./../db");
const T_ADMINS = "admins";

const list = (params = {}) => {
  return bd(T_ADMINS).where(params).select({
    adminId: "admin_id",
    adminDisplayname: "admin_displayname",
    adminUserId: "admin_user_id",
  });
};

module.exports = {
  list,
};
