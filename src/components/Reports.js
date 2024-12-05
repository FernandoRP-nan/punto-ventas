import React, { useState } from "react";
import { fetchSalesCuts } from "../api"; // Asegúrate de que la ruta sea correcta

const SalesCuts = () => {
  const [cuts, setCuts] = useState({ morning_sales: 0, evening_sales: 0 });
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCuts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchSalesCuts(date); // Usar la función de API
      setCuts(response); // Aquí ya no necesitas acceder a response.data
    } catch (error) {
      setError("Error fetching sales cuts");
      console.error("Error fetching sales cuts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Cortes de Ventas por Turno</h1>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={fetchCuts}>Generar Corte</button>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h2>Resultados</h2>
        <p>Ventas Matutinas: ${cuts.morning_sales.toFixed(2)}</p>
        <p>Ventas Vespertinas: ${cuts.evening_sales.toFixed(2)}</p>
        <p>
        Total : ${(cuts.morning_sales + cuts.evening_sales).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default SalesCuts;
