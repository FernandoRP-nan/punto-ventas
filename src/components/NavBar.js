import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Asegúrate de importar el archivo CSS

const NavBar = ({ role }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {role === "GERENTE" && (
          <>
            <li className="navbar-item">
              <Link to="/inventory" className="navbar-link">
                Inventario
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/purchases" className="navbar-link">
                Compras
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/reports" className="navbar-link">
                Reportes
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/logs" className="navbar-link">
                Logs
              </Link>
            </li>
          </>
        )}
        {(role === "GERENTE" || role === "CAJERO") && (
          <li className="navbar-item">
            <Link to="/sales" className="navbar-link">
              Ventas
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
