const db = require("../config/db");
const adminsService = require("./admins");

const T_USERS = "users";
const T_USER_TYPES = "user_types";

const findByUsername = async (user_username) => {
  return db(T_USERS)
    .select({
      userId: "user_id",
      userUsername: "user_username",
      userUserTypeId: "user_user_type_id",
      userTypeId: "user_type_id",
      userTypeName: "user_type_name",
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
      userId: "user_id",
      userUsername: "user_username",
      userUserTypeId: "user_user_type_id",
      userTypeId: "user_type_id",
      userTypeName: "user_type_name",
    })
    .where({ user_id: id })
    .join(
      T_USER_TYPES,
      `${T_USER_TYPES}.user_type_id`,
      "=",
      `${T_USERS}.user_user_type_id`
    )
    .first();
};

const getUserData = async (id) => {
  try {
    let userData = {};
    await db.transaction(async (trx) => {
      // Get the user
      const user = await findByUserId(id);

      // Get the role info
      if (user.userTypeName === "admin") {
        const admin = await adminsService.findAdminByUserId(user.userId);
        userData = admin;
      } else if (user.userTypeName === "teacher") {
        const teacher = await teachersService.readTeacher({
          teacher_user_id: user.userId,
        });
        userData = teacher;
      } else if (user.userTypeName === "student") {
        const student = await studentsService.readStudent({
          student_user_id: user.userId,
        });
        userData = student;
      }
    });

    return userData;
  } catch (error) {
    throw error;
  }
};

const login = async ({ user_username }) => {
  return db(T_USERS)
    .select({
      userId: "user_id",
      userUsername: "user_username",
      userUserTypeId: "user_user_type_id",
      userTypeId: "user_type_id",
      userTypeName: "user_type_name",
      userPassword: "user_password",
    })
    .where({ user_username })
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
  getUserData,
  createUser,
  login,
};
