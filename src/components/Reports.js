import React, { useState } from "react";
import { fetchSalesCuts } from "../api"; 
import "./Reports.css";

const SalesCuts = () => {
  const [cuts, setCuts] = useState({ morning_sales: 0, evening_sales: 0 });
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCuts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchSalesCuts(date); 
      setCuts(response);
    } catch (error) {
      setError("Error fetching sales cuts");
      console.error("Error fetching sales cuts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sales-cuts-container">
      <h1>Cortes de Ventas por Turno</h1>
      <div className="form-container">
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          className="date-input"
        />
        <button onClick={fetchCuts} className="generate-button">
          Generar Corte
        </button>
      </div>
      {loading && <p className="loading-text">Cargando...</p>}
      {error && <p className="error-text">{error}</p>}
      <div className="results-container">
        <h2>Resultados</h2>
        <p>Ventas Matutinas: ${cuts.morning_sales.toFixed(2)}</p>
        <p>Ventas Vespertinas: ${cuts.evening_sales.toFixed(2)}</p>
        <p>Total: ${(cuts.morning_sales + cuts.evening_sales).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SalesCuts;
