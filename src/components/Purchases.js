import React, { useState, useEffect } from "react";
import axios from "axios";

const Purchases = () => {
  const [products, setProducts] = useState([]);
  const [purchase, setPurchase] = useState({ product_id: "", quantity: 0 });
  const [managerId, setManagerId] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/inventory");
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
      await axios.post("/api/purchases", payload);
      setPurchase({ product_id: "", quantity: 0 });
      fetchProducts();
    } catch (error) {
      console.error("Error making purchase:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Registro de Compras</h1>
      <input
        type="text"
        placeholder="ID Gerente"
        value={managerId}
        onChange={(e) => setManagerId(e.target.value)}
      />
      <select
        value={purchase.product_id}
        onChange={(e) =>
          setPurchase({ ...purchase, product_id: e.target.value })
        }
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
      />
      <button onClick={handlePurchase}>Registrar Compra</button>
    </div>
  );
};

export default Purchases;
