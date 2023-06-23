const db = require("./../db");
const T_USERS = "users";
const T_ADMINS = "admins";

const create = async (adminData) => {
  try {
    const { user_username, user_password, admin_displayname } = adminData;
    await db.transaction(async (trx) => {
      /* Create User */
      const [userId] = await trx(T_USERS).insert(
        {
          user_username,
          user_password,
          user_user_type_id: 1,
        },
        "user_id"
      );

      /* Create Admin */
      const [adminId] = await trx(T_ADMINS).insert(
        {
          admin_displayname,
          admin_user_id: userId,
        },
        "admin_id"
      );

      const admin = await trx(T_ADMINS).where("admin_id", adminId).first();
      return admin;
    });
  } catch (err) {
    throw err;
  }
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
  create,
  read,
  update,
  remove,
};
