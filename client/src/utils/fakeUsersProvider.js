const userRoles = [
  {
    name: "admins",
    displayName: "Administradores",
    users: [
      {
        roleId: 1,
        roleDisplayname: "Administrador Principal",
        roleUserId: 1,
        userId: 1,
        userUsername: "123456789",
        userUserTypeId: 1,
        userTypeId: 1,
        userTypeName: "admin",
        pfp: "/assets/img/pfp/1.jpg",
      },
      {
        roleId: 4,
        roleDisplayname: "Administrador Secundario",
        roleUserId: 4,
        userId: 4,
        userUsername: "123456789",
        userUserTypeId: 1,
        userTypeId: 1,
        userTypeName: "admin",
        pfp: "/assets/img/pfp/4.jpg",
      },
    ],
  },
  {
    name: "teachers",
    displayName: "Profesores",
    users: [
      {
        roleId: 2,
        roleDisplayname: "Profesor Cualquiera",
        roleUserId: 2,
        userId: 2,
        userUsername: "123456789",
        userUserTypeId: 2,
        userTypeId: 2,
        userTypeName: "teacher",
        pfp: "/assets/img/pfp/2.jpg",
      },
    ],
  },
  {
    name: "students",
    displayName: "Estudiantes",
    users: [
      {
        roleId: 3,
        roleDisplayname: "Estudiante",
        roleUserId: 3,
        userId: 3,
        userUsername: "123456789",
        userUserTypeId: 3,
        userTypeId: 3,
        userTypeName: "student",
        pfp: "/assets/img/pfp/3.jpg",
      },
    ],
  },
];

const getAdmins = () => {
  return userRoles[0].users;
};

const getAdminById = (id) => {
  return userRoles[0].users.find((user) => user.userId == id);
};

const getTeachers = () => {
  return userRoles[1].users;
};

const getStudents = () => {
  return userRoles[2].users;
};

export default { getAdmins, getAdminById, getTeachers, getStudents };
