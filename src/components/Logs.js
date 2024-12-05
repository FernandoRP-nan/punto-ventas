import React, { useState, useEffect } from "react";
import axios from "axios";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState({ user_id: "", action: "" });

  const fetchLogs = async () => {
    try {
      const response = await axios.get("/api/logs", { params: filter });
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filter]);

  return (
    <div>
      <h1>Logs de Movimientos</h1>
      <input
        type="text"
        placeholder="ID Usuario"
        onChange={(e) => setFilter({ ...filter, user_id: e.target.value })}
      />
      <select
        onChange={(e) => setFilter({ ...filter, action: e.target.value })}
      >
        <option value="">Selecciona una acción</option>
        <option value="VENTA">Venta</option>
        <option value="COMPRA">Compra</option>
        <option value="LOGIN">Inicio de Sesión</option>
      </select>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            Usuario: {log.user_id} - Acción: {log.action} - Detalles:{" "}
            {log.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
