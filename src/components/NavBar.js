import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ role }) => {
  return (
    <nav>
      <ul>
        {role === "GERENTE" && (
          <li>
            <Link to="/inventory">Inventario</Link>
          </li>
        )}
        {role === "GERENTE" && (
          <li>
            <Link to="/purchases">Compras</Link>
          </li>
        )}
        {role === "GERENTE" && (
          <li>
            <Link to="/reports">Reportes</Link>
          </li>
        )}
        {(role === "GERENTE" || role === "CAJERO") && (
          <li>
            <Link to="/sales">Ventas</Link>
          </li>
        )}
        {role === "GERENTE" && (
          <li>
            <Link to="/logs">Logs</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
