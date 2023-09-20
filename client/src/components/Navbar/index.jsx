import { useState } from "react";
import { Link } from "react-router-dom";

import RequireAuth from "../../auth/RequireAuth";
import Arrow from "./assets/Arrow";
import MenuIcon from "./assets/MenuIcon";
import "./index.css";

const navbarLinks = {
  modules: [
    {
      displayName: "Académico",
      href: "/academic-management",
      sublinks: [
        { displayName: "Matrícula", href: "/enrollment", name: "enrollment" },
        {
          displayName: "Inscripciones",
          href: "/enrollments",
          name: "enrollments",
        },
        { displayName: "Promoción", href: "/promotion", name: "promotion" },
        { displayName: "Académico", href: "/academic", name: "academic" },
        { displayName: "Asignación", href: "/assignment", name: "assignment" },
      ],
    },
    {
      displayName: "Institucional",
      title: "Configuración Institucional",
      href: "/institutional-configuration",
      sublinks: [
        {
          displayName: "Institución (Información General)",
          href: "/general-institution",
          name: "general-institution",
        },
        {
          displayName: "Institución (Grupos y Dificultades)",
          href: "/institution-groups",
          name: "institution-groups",
        },
        {
          displayName: "Periodos y Vigencias",
          href: "/periods-and-dates",
          name: "periods-and-dates",
        },
        {
          displayName: "Variables Globales",
          href: "/global-variables",
          name: "global-variables",
        },
      ],
    },
    {
      displayName: "Informes",
      href: "/reports",
      sublinks: [
        {
          displayName: "Generación de Informes",
          href: "/report-generation",
          name: "report-generation",
        },
      ],
    },
    {
      displayName: "Seguimiento",
      href: "/student-tracking",
      sublinks: [
        { displayName: "Seguimiento", href: "#tracking", name: "tracking" },
        {
          displayName: "Salidas-Asistencias",
          href: "/attendance",
          name: "attendance",
        },
        { displayName: "Hoja de Vida", href: "#resume", name: "resume" },
        {
          displayName: "Anotaciones",
          href: "/annotations",
          name: "annotations",
        },
      ],
    },
    {
      displayName: "Personal",
      href: "/staff-management",
      sublinks: [
        { displayName: "Personal", href: "/staff", name: "staff" },
        { displayName: "Documentos", href: "/documents", name: "documents" },
      ],
    },
  ],
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
            <div>
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
              <ul className='Navbar-links'>
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
    <nav className='Navbar'>
      <div className='Navbar-navbar'>
        <li className='Navbar-logo'>
          <Link to='/'>Colegio Empresarial</Link>
        </li>
        <ul className={`Navbar-links ${showMobileMenu ? "show" : ""}`}>
          {renderNavbarLinks(navbarLinks.modules)}
          {renderNavbarLinks(navbarLinks.last)}
        </ul>
        <li className='Navbar-open' onClick={toggleMobileMenu}>
          <i>
            <MenuIcon className={showMobileMenu ? "open" : ""} />
          </i>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
