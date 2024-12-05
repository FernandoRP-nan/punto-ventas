import React, { useState, useEffect } from "react";
import { fetchProducts, createProduct, deleteProduct } from "../api"; // Asegúrate de ajustar la ruta según tu estructura

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: 0,
    max_stock: 0,
    cost: 0,
    sale_price: 0,
  });

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        stock: 0,
        max_stock: 0,
        cost: 0,
        sale_price: 0,
      });
      loadProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Inventario</h1>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              stock: parseInt(e.target.value, 10),
            })
          }
        />
        <input
          type="number"
          placeholder="Max Stock"
          value={newProduct.max_stock}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              max_stock: parseInt(e.target.value, 10),
            })
          }
        />
        <input
          type="number"
          placeholder="Costo"
          value={newProduct.cost}
          onChange={(e) =>
            setNewProduct({ ...newProduct, cost: parseFloat(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Precio Venta"
          value={newProduct.sale_price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              sale_price: parseFloat(e.target.value),
            })
          }
        />
        <button onClick={handleCreate}>Crear Producto</button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Stock: {product.stock} - Precio: $
            {product.sale_price}
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
