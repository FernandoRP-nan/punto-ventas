import React, { useState, useEffect } from "react";
import { createSale, fetchProducts } from "../api"; // Asegúrate de ajustar la ruta según tu estructura
import "./Sales.css"; // Asegúrate de importar el archivo CSS

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
    if (product.stock > 0) {
      // Verifica si hay stock disponible
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      alert("No hay suficiente stock para agregar este producto al carrito.");
    }
  };

  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
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
      setCart([]);
      loadProducts();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) => total + parseFloat(item.sale_price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="sales-container">
      <h1>Registro de Ventas</h1>
      <input
        type="text"
        placeholder="ID Cajero"
        value={cashierId}
        onChange={(e) => setCashierId(e.target.value)}
        className="cashier-input"
      />
      <h2>Productos Disponibles</h2>
      <ul className="product-list">
        {products
          .filter((product) => product.stock > 0) // Filtra productos con stock mayor a 0
          .map((product) => (
            <li key={product.id} className="product-item">
              <span>
                {product.name} - Precio: $
                {parseFloat(product.sale_price).toFixed(2)} - Stock:{" "}
                {product.stock}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-button"
              >
                Agregar al carrito
              </button>
            </li>
          ))}
      </ul>
      <h2>Carrito</h2>
      <ul className="cart-list">
        {cart.map((item, index) => (
          <li key={index} className="cart-item">
            {item.name} - Cantidad: {item.quantity} - Precio: $
            {parseFloat(item.sale_price).toFixed(2)}
            <button
              onClick={() => handleRemoveFromCart(index)}
              className="remove-button"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: ${calculateTotal()}</h3>
      <button onClick={handleCheckout} className="checkout-button">
        Finalizar Venta
      </button>
    </div>
  );
};

export default Sales;
