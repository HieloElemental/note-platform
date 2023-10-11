import useUser from "../../../../hooks/useUser";

import Main from "../../../../components/Main/index";
import ErrorAlert from "../../../../components/ErrorAlert";
import Navbar from "../../../../components/Navbar";
import Sidebar from "../../../../components/Sidebar/index";
import Card from "../../../../components/Card/index";

import fakeUsersProvider from "../../../../utils/fakeUsersProvider";

const Teachers = () => {
  const user = useUser();

  const teacherUsers = fakeUsersProvider.getTeachers();

  return (
    <>
      <ErrorAlert type='ErrorAlert' />
      <header>
        <Navbar />
      </header>
      <Main>
        <Sidebar
          user={user?.userData}
          title={user?.userData?.roleDisplayname}
        />
        <Card className='Manage Admins'>
          <h1>Manejar Profesores</h1>
          <ul>
            <li>
              <a href='#'>Agregar</a>
            </li>
          </ul>
          {teacherUsers && (
            <>
              <hr />
              <h1>Lista de Profesores</h1>
              <table>
                <thead>
                  <tr>
                    <td width='70%'>Nombre</td>
                    <td>Ver</td>
                    <td>Editar</td>
                    <td>Eliminar</td>
                  </tr>
                </thead>
                <tbody>
                  {teacherUsers.map((teacherUser, i) => {
                    return (
                      <tr key={i}>
                        <td>{teacherUser.userDisplayname}</td>
                        <td>
                          <a href='#'>&#128269;</a>
                        </td>
                        <td>
                          <a href='#'>&#9999;&#65039;</a>
                        </td>
                        <td>
                          <a href='#'>&#10060;</a>
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

export default Teachers;
