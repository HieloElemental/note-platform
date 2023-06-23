const db = require("./../db");
const usersService = require("./users");

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

const createUserAdmin = async (adminData) => {
  const { user_username, user_password, admin_displayname } = adminData;

  // check if the username aleady exists
  const existingUser = await usersService.findByUsername(user_username);
  if (existingUser) {
    throw new Error("User already exists");
  }

  try {
    await db.transaction(async (trx) => {
      //Create user
      const [userId] = await usersService.createUser({
        user_username,
        user_password,
        user_user_type_id: 1,
      });

      //Create admin
      const [adminId] = await createAdmin({
        admin_displayname,
        admin_user_id: userId,
      });

      const admin = await readAdmin({ admin_id: adminId });
      return admin;
    });
  } catch (error) {
    throw error;
  }
};

const update = (adminId, adminData) => {
  return db(T_ADMINS).where({ admin_id: adminId }).update({ adminData });
};

const remove = (adminId) => {
  return db(T_ADMINS).where({ admin_id: adminId }).del();
};

module.exports = {
  createUserAdmin,
  readAdmin,
  update,
  remove,
};
