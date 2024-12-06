import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Inventory from "./components/Inventory";
import Sales from "./components/Sales";
import Purchases from "./components/Purchases"; 
import Reports from "./components/Reports"; 
import Logs from "./components/Logs";
import NavBar from "./components/NavBar";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [user, setUser] = useState(null);

  // Maneja el inicio de sesión, actualiza el estado con los datos del usuario
  const handleLogin = (token) => {
    const decodedToken = jwtDecode(token);
    setUser({ role: decodedToken.role, token }); 
  };

  return (
    <Router>
      <div>
        {/* Si no hay usuario, muestra el formulario de login */}
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <div>
            <h1>Bienvenido, {user.role}</h1> {
              
            }
            <NavBar role={user.role} setUser={setUser} />{" "}
            {

            }
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
