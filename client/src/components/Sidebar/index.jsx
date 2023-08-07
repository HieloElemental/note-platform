import { PropTypes } from "prop-types";

import Card from "./../Card/index";
import SquareImg from "./components/SquareImg";

import "./index.css";

const Sidebar = ({ title, user }) => {
  return (
    <Card className="Sidebar">
      <h1>{title}</h1>
      <ul className="Userdata">
        <li className="li-img">
          <SquareImg
            src={`${import.meta.env.VITE_BACKEND_URL}${user?.pfp}`}
            alt=""
          />
        </li>
        {user?.roleDisplayname && (
          <li>
            <p>
              <strong>Nombre: </strong>
              {user?.roleDisplayname || "Sin Nombre"}
            </p>
          </li>
        )}
        {user?.roleLastnames && (
          <li>
            <p>
              <strong>Apellidos: </strong>
              {user?.roleLastnames || "Sin Nombre"}
            </p>
          </li>
        )}
      </ul>
    </Card>
  );
};
Sidebar.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object,
};

export default Sidebar;
