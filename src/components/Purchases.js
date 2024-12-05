import React, { useState, useEffect } from "react";
import { fetchProducts, createPurchase } from "../api"; // Asegúrate de ajustar la ruta según tu estructura
import "./Purchases.css"; // Asegúrate de importar el archivo CSS

const Purchases = () => {
  const [products, setProducts] = useState([]);
  const [purchase, setPurchase] = useState({ product_id: "", quantity: 0 });
  const [managerId, setManagerId] = useState("");

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePurchase = async () => {
    try {
      const payload = {
        manager_id: managerId,
        product_id: purchase.product_id,
        quantity: purchase.quantity,
      };
      await createPurchase(payload);
      setPurchase({ product_id: "", quantity: 0 });
      loadProducts();
    } catch (error) {
      console.error("Error making purchase:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="purchases-container">
      <h1>Registro de Compras</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="ID Gerente"
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
          className="input-field"
        />
        <select
          value={purchase.product_id}
          onChange={(e) =>
            setPurchase({ ...purchase, product_id: e.target.value })
          }
          className="input-field"
        >
          <option value="">Selecciona un producto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Cantidad"
          value={purchase.quantity}
          onChange={(e) =>
            setPurchase({ ...purchase, quantity: parseInt(e.target.value, 10) })
          }
          className="input-field"
        />
        <button onClick={handlePurchase} className="submit-button">
          Registrar Compra
        </button>
      </div>
    </div>
  );
};

export default Purchases;