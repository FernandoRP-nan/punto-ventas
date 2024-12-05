import React, { useState, useEffect } from "react";
import api from "../api";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/inventory");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar el inventario:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Inventario</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.stock} piezas
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
