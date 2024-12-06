import React, { useState, useEffect } from "react";
import { fetchInventoryLogs, fetchLoginLogs } from "../api"; // Asegúrate de ajustar la ruta según tu estructura
import "./Logs.css"; // Asegúrate de importar el archivo CSS

const Logs = () => {
  const [inventoryLogs, setInventoryLogs] = useState([]);
  const [loginLogs, setLoginLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("inventory"); // Estado para controlar la pestaña activa

  const loadLogs = async () => {
    setLoading(true);
    setError("");
    try {
      const inventoryResponse = await fetchInventoryLogs();
      const loginResponse = await fetchLoginLogs(); // Asegúrate de que esta función esté definida en tu API

      // Ordenar los logs por fecha en orden inverso
      const sortedInventoryLogs = inventoryResponse.data.sort(
        (a, b) => new Date(b.date_time) - new Date(a.date_time)
      );
      const sortedLoginLogs = loginResponse.data.sort(
        (a, b) => new Date(b.date_time) - new Date(a.date_time)
      );

      setInventoryLogs(sortedInventoryLogs);
      setLoginLogs(sortedLoginLogs);
    } catch (error) {
      setError("Error fetching logs");
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="logs-container">
      <h1>Logs de Actividad</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Pestañas */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "inventory" ? "active" : ""}`}
          onClick={() => setActiveTab("inventory")}
        >
          Logs de Inventario
        </button>
        <button
          className={`tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Logs de Inicio de Sesión
        </button>
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === "inventory" && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Producto ID</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {inventoryLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.product_id}</td>
                  <td>{log.action}</td>
                  <td>{log.quantity}</td>
                  <td>{new Date(log.date_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "login" && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Acción</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {loginLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.username}</td>
                  <td>{log.action}</td>
                  <td>{new Date(log.date_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Logs;
