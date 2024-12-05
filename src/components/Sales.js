import React, { useState, useEffect } from "react";
import { createSale, fetchSales, fetchProducts } from "../api"; // Asegúrate de ajustar la ruta según tu estructura

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cashierId, setCashierId] = useState("");

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const handleCheckout = async () => {
    try {
      const payload = {
        cashier_id: cashierId,
        products: cart.map(({ id, sale_price, quantity }) => ({
          product_id: id,
          unit_price: sale_price,
          quantity,
        })),
      };
      await createSale(payload);
      //await axios.post("/api/sales", payload);
      setCart([]);
      loadProducts();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Registro de Ventas</h1>
      <input
        type="text"
        placeholder="ID Cajero"
        value={cashierId}
        onChange={(e) => setCashierId(e.target.value)}
      />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Precio: ${product.sale_price} - Stock:{" "}
            {product.stock}
            <button onClick={() => handleAddToCart(product)}>
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>
      <h2>Carrito</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Finalizar Venta</button>
    </div>
  );
};

export default Sales;
