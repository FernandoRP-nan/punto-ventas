import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesReports = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState({ start_date: "", end_date: "" });

  const fetchReports = async () => {
    try {
      const response = await axios.get("/api/sales/reports", {
        params: filter,
      });
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    if (filter.start_date && filter.end_date) {
      fetchReports();
    }
  }, [filter]);

  return (
    <div>
      <h1>Cortes de Ventas</h1>
      <input
        type="date"
        placeholder="Fecha Inicio"
        onChange={(e) => setFilter({ ...filter, start_date: e.target.value })}
      />
      <input
        type="date"
        placeholder="Fecha Fin"
        onChange={(e) => setFilter({ ...filter, end_date: e.target.value })}
      />
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            Fecha: {report.date} - Total Ventas: ${report.total_sales}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesReports;
