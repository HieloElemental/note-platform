import { useState } from "react";

import useUser from "../../../../hooks/useUser";

import Main from "../../../../components/Main/index";
import ErrorAlert from "../../../../components/ErrorAlert";
import Navbar from "../../../../components/Navbar";
import Sidebar from "./../../../../components/Sidebar/index";
import Card from "./../../../../components/Card/index";

import fakeUsersProvider from "../../../../utils/fakeUsersProvider";
import { Link } from "react-router-dom";

const Admins = () => {
  const user = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const adminUsers = fakeUsersProvider.getAdmins();

  const handleUserClick = (adminUser) => {
    setSelectedUser(adminUser);
  };

  return (
    <>
      <ErrorAlert type="ErrorAlert" />
      <header>
        <Navbar />
      </header>
      <Main>
        <Sidebar
          user={selectedUser ? selectedUser : user?.userData}
          title={
            selectedUser
              ? selectedUser?.roleDisplayname
              : user?.userData?.roleDisplayname
          }
        />
        <Card className="Manage Admins">
          <h1>Manejar Administradores</h1>
          <ul>
            <li>
              <a href="#">Agregar</a>
            </li>
          </ul>
          {adminUsers && (
            <>
              <hr />
              <h1>Lista de Administradores</h1>
              <table>
                <thead>
                  <tr>
                    <td width="70%">Nombre</td>
                    <td>Ver</td>
                    <td>Editar</td>
                    <td>Eliminar</td>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((adminUser, i) => {
                    return (
                      <tr key={i} onClick={() => handleUserClick(adminUser)}>
                        <td>{adminUser.roleDisplayname}</td>
                        <td>
                          <Link to={`/manage/admin/${adminUser.userId}`}>
                            &#128269;
                          </Link>
                        </td>
                        <td>
                          <Link>&#9999;&#65039;</Link>
                        </td>
                        <td>
                          <a href="#">&#10060;</a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </Card>
      </Main>
    </>
  );
};

export default Admins;
