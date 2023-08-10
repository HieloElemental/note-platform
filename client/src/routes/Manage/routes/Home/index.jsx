import useUser from "../../../../hooks/useUser";

import { Link } from "react-router-dom";
import { useState } from "react";

import ErrorAlert from "../../../../components/ErrorAlert/index";
import Navbar from "../../../../components/Navbar/index";
import Main from "../../../../components/Main/index";
import Sidebar from "../../../../components/Sidebar/index";
import Card from "../../../../components/Card/index";

import fakeUsersProvider from "../../../../utils/fakeUsersProvider";

const Home = () => {
  const user = useUser();
  const [selectedUserRole, setSelectedUserRole] = useState("default");

  const userRoles = [
    {
      name: "admins",
      single: "admin",
      displayName: "Administradores",
      users: fakeUsersProvider.getAdmins(),
    },
    {
      name: "teachers",
      single: "teacher",
      displayName: "Profesores",
      users: fakeUsersProvider.getTeachers(),
    },
    {
      name: "students",
      single: "student",
      displayName: "Estudiantes",
      users: fakeUsersProvider.getStudents(),
    },
  ];

  const selectedUserHandler = (event) => {
    setSelectedUserRole(event.target.value);
  };

  return (
    <>
      <ErrorAlert type="ErrorAlert" />
      <header>
        <Navbar />
      </header>
      <Main>
        <Sidebar
          user={user?.userData}
          title={user?.userData?.roleDisplayname}
        />
        <Card className="Manage">
          <h1>Manejar Usuarios</h1>
          <ul>
            {userRoles.map((userRole, i) => {
              return (
                <li key={i}>
                  <Link to={`/manage/${userRole.name}`}>
                    {userRole.displayName}
                  </Link>
                </li>
              );
            })}
          </ul>
          <h1>Listado De Usuarios Vigentes</h1>
          <form autoComplete="off">
            <div className="user-box">
              <label>Tipo de usuario:</label>
              <select
                name="userType"
                id="userType"
                defaultValue="default"
                onChange={selectedUserHandler}
              >
                <option value="default">Seleccionar</option>
                {userRoles.map((userRole, i) => {
                  return (
                    <option key={i} value={i}>
                      {userRole.displayName}
                    </option>
                  );
                })}
              </select>
            </div>
          </form>
          {selectedUserRole != "default" && (
            <>
              <h1>{userRoles[selectedUserRole].displayName}</h1>
              {userRoles[selectedUserRole].users && (
                <table>
                  <thead>
                    <tr>
                      <td width="70%">Nombre</td>
                      <td>Ver</td>
                    </tr>
                  </thead>
                  <tbody>
                    {userRoles[selectedUserRole].users.map((user, i) => {
                      return (
                        <tr key={i}>
                          <td>{user.roleDisplayname}</td>
                          <td>
                            <Link
                              to={`/manage/${userRoles[selectedUserRole].single}/${user.userId}`}
                            >
                              &#128269;
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </>
          )}
        </Card>
      </Main>
    </>
  );
};

export default Home;
