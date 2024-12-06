import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  // Definir el estado para el nombre de usuario y la contraseña
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {

        onLogin(data.token);
        localStorage.setItem("token", data.token);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      alert("Hubo un error al intentar iniciar sesión.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Inicio de sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-field">
          <label htmlFor="username" className="form-label">
            Usuario:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Introduce tu nombre de usuario"
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce tu contraseña"
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
