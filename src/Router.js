import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Inventory from "./Inventory";
import Sales from "./Sales";
import Purchases from "./Purchases";
import SalesReports from "./SalesReports";
import Logs from "./Logs";

const App = () => {
  const role = localStorage.getItem("role"); // Almacena el rol tras login

  return (
    <Router>
      <Routes>
        {role === "GERENTE" && (
          <>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/sales-reports" element={<SalesReports />} />
            <Route path="/logs" element={<Logs />} />
          </>
        )}
        {role === "CAJERO" && <Route path="/sales" element={<Sales />} />}
        <Route
          path="*"
          element={
            <Navigate to={role === "GERENTE" ? "/inventory" : "/sales"} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
