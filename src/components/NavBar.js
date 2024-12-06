import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api"; 
import "./NavBar.css";

const NavBar = ({ role, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); 
      await logout(token); 
      setUser(null); 
      localStorage.removeItem("token"); 
      navigate("/login"); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {role === "GERENTE" && (
          <li className="navbar-item">
            <Link to="/purchases" className="navbar-link">
              Compras
            </Link>
          </li>
        )}
        {(role === "GERENTE" || role === "CAJERO") && (
          <>
            <li className="navbar-item">
              <Link to="/sales" className="navbar-link">
                Ventas
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/inventory" className="navbar-link">
                Inventario
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
        <li className="navbar-item">
          <button onClick={handleLogout} className="navbar-link">
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
