import { PropTypes } from "prop-types";

import useUser from "../../hooks/useUser";

const Sidebar = ({ title }) => {
  const user = useUser();

  return (
    <section className="Sidebar">
      <h1>{title}</h1>
      <ul className="Userdata">
        <li>
          <img src="" alt="" />
        </li>
        <li>
          <p>
            <strong>Nombre: </strong>
            {user.user?.roleDisplayname}
          </p>
        </li>
      </ul>
    </section>
  );
};
Sidebar.propTypes = {
  title: PropTypes.string,
};

export default Sidebar;
