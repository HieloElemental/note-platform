const db = require("../config/db");
const usersService = require("./users");
const adminsService = require("./admins");

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
      const [adminId] = await adminsService.createAdmin({
        admin_displayname,
        admin_user_id: userId,
      });

      const admin = await adminsService.readAdmin({ admin_id: adminId });
      return admin;
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { createUserAdmin };
