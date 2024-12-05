import React, { useState, useEffect } from "react";
import { fetchInventoryLogs } from "../api"; // Asegúrate de ajustar la ruta según tu estructura
import './Logs.css'; // Asegúrate de importar el archivo CSS

const Logs = () => {
  const [inventoryLogs, setInventoryLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLogs = async () => {
    setLoading(true);
    setError("");
    try {
      const inventoryResponse = await fetchInventoryLogs();
      // Ordenar los logs por fecha en orden inverso
      const sortedLogs = inventoryResponse.data.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
      setInventoryLogs(sortedLogs);
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
      <h1>Logs de Movimientos</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Logs de Inventario</h2>
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
  );
};

export default Logs;