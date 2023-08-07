import useUser from "../../hooks/useUser";

import { Link } from "react-router-dom";

import ErrorAlert from "./../../components/ErrorAlert/index";
import Navbar from "./../../components/Navbar/index";
import Main from "./../../components/Main/index";
import Sidebar from "./../../components/Sidebar/index";
import Card from "./../../components/Card/index";

import "./index.css";

const Manage = () => {
  const user = useUser();

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
            <li>
              <Link to="/manage/admins">Administradoreses</Link>
            </li>
            <li>
              <Link to="/manage/teachers">Profesores</Link>
            </li>
            <li>
              <Link to="/manage/students">Estudiantes</Link>
            </li>
          </ul>
          <h1>Listado De Usuarios Vigentes</h1>
          <form autoComplete="off">
            <div className="user-box">
              <label>Tipo de usuario:</label>
              <select name="userType" id="userType">
                <option value="default" selected>
                  Seleccionar
                </option>
                <option value="student">Estudiante</option>
                <option value="teacher">Profesor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </form>
        </Card>
      </Main>
    </>
  );
};

export default Manage;
