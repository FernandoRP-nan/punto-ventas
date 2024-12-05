import React, { useState } from "react";
import Login from "./components/Login";
import Inventory from "./components/Inventory";
import Sales from "./components/Sales";
import Logs from "./components/Logs";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [user, setUser] = useState(null); // Almacena el usuario actual

  // Maneja el inicio de sesión, actualiza el estado con los datos del usuario
  const handleLogin = (token) => {
    const decodedToken = jwtDecode(token); // Decodifica el token
    setUser({ role: decodedToken.role, token }); // Establece el rol y el token en el estado
  };

  return (
    <div>
      {/* Si no hay usuario, muestra el formulario de login */}
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <h1>Bienvenido, {user.role}</h1> {/* Muestra el rol del usuario */}
          <Inventory />
          <Sales />
          <Logs />
        </div>
      )}
    </div>
  );
};

export default App;
