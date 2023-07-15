import { useState } from "react";
import { Link } from "react-router-dom";

import RequireAuth from "../../auth/RequireAuth";
import Arrow from "./assets/Arrow";
import MenuIcon from "./assets/MenuIcon";
import "./index.css";

const navbarLinks = {
  admin: [
    { displayName: "Inicio", href: "/" },
    {
      displayName: "Manejar",
      href: "/manage",
      sublinks: [
        { displayName: "Estudiantes", href: "/manage/students" },
        { displayName: "Profesores", href: "/manage/teachers" },
        { displayName: "Administradores", href: "/manage/admins" },
      ],
    },
    { displayName: "Estadisticas", href: "/stats" },
  ],
  teacher: [],
  student: [],
  last: [{ displayName: "Salir", href: "/logout" }],
};

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSublinks, setShowSublinks] = useState({});

  const renderNavbarLinks = (links) => {
    const showSubLinkHandler = (displayName) => {
      setShowSublinks((prevState) => ({
        ...prevState,
        [displayName]: !prevState[displayName],
      }));
    };

    return (
      <>
        {links.map((link, index) => (
          <li key={index}>
            <div className=".Navbar-fake-a">
              <Link to={link.href}>{link.displayName}</Link>
              {link.sublinks && (
                <i onClick={() => showSubLinkHandler(link.displayName)}>
                  <Arrow
                    className={showSublinks[link.displayName] ? "rotate" : ""}
                  />
                </i>
              )}
            </div>
            {link.sublinks && showSublinks[link.displayName] && (
              <ul className="Navbar-links">
                {renderNavbarLinks(link.sublinks)}
              </ul>
            )}
          </li>
        ))}
      </>
    );
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prevState) => !prevState);
  };

  return (
    <nav className="Navbar">
      <div className="Navbar-navbar">
        <li className="Navbar-logo">
          <Link to="/">Colegio Empresarial</Link>
        </li>
        <ul className={`Navbar-links ${showMobileMenu ? "show" : ""}`}>
          <RequireAuth allowedRoles={["admin"]}>
            {renderNavbarLinks(navbarLinks.admin)}
          </RequireAuth>
          <RequireAuth allowedRoles={["teacher"]}>
            {renderNavbarLinks(navbarLinks.teacher)}
          </RequireAuth>
          <RequireAuth allowedRoles={["student"]}>
            {renderNavbarLinks(navbarLinks.student)}
          </RequireAuth>
          {renderNavbarLinks(navbarLinks.last)}
        </ul>
        <li className="Navbar-open" onClick={toggleMobileMenu}>
          <i>
            <MenuIcon className={showMobileMenu ? "open" : ""} />
          </i>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
