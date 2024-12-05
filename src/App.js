import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Inventory from "./components/Inventory";
import Sales from "./components/Sales";
import Purchases from "./components/Purchases"; // Crear este componente
import Reports from "./components/Reports"; // Crear este componente
import Logs from "./components/Logs";
import NavBar from "./components/NavBar";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [user, setUser] = useState(null); // Almacena el usuario actual

  // Maneja el inicio de sesión, actualiza el estado con los datos del usuario
  const handleLogin = (token) => {
    const decodedToken = jwtDecode(token); // Decodifica el token
    setUser({ role: decodedToken.role, token }); // Establece el rol y el token en el estado
  };

  return (
    <Router>
      <div>
        {/* Si no hay usuario, muestra el formulario de login */}
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <div>
            <h1>Bienvenido, {user.role}</h1> {/* Muestra el rol del usuario */}
            <NavBar role={user.role} />
            <Routes>
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/logs" element={<Logs />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
