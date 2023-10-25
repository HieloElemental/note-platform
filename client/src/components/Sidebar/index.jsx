import { PropTypes } from "prop-types";
import { useState } from "react";

import SquareImg from "./components/SquareImg";

import "./index.css";

const Sidebar = ({ title, user }) => {
  const [hidden, setHidden] = useState(true);

  const handleMouseEnter = () => {
    setHidden(false);
  };

  const handleMouseLeave = () => {
    setHidden(true);
  };
  return (
    <div
      className={`Sidebar ${hidden && "hidden"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h1>{title}</h1>
      <ul className='User-data'>
        <li className='li-img'>
          <SquareImg
            src={`${import.meta.env.VITE_BACKEND_URL}${user?.pfp}`}
            alt=''
          />
        </li>
        {user?.roleDisplayName && (
          <li>
            <p>
              <strong>Nombre: </strong>
              {user?.roleDisplayName || "Sin Nombre"}
            </p>
          </li>
        )}
        {user?.roleLastNames && (
          <li>
            <p>
              <strong>Apellidos: </strong>
              {user?.roleLastNames || "Sin Nombre"}
            </p>
          </li>
        )}
      </ul>
    </div>
  );
};
Sidebar.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object,
};

export default Sidebar;
