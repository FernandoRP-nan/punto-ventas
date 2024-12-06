import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api"; // Asegúrate de ajustar la ruta según tu estructura
import "./NavBar.css"; // Asegúrate de importar el archivo CSS

const NavBar = ({ role, setUser }) => {
  const navigate = useNavigate(); // Hook para redirigir después de cerrar sesión

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); // Asumiendo que guardas el token en localStorage
      await logout(token); // Llama a la función de logout
      setUser(null); // Limpia el estado del usuario
      localStorage.removeItem("token"); // Elimina el token del localStorage
      navigate("/login"); // Redirige a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

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
