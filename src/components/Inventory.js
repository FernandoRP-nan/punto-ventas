import React, { useState, useEffect } from "react";
import { fetchProducts, createProduct } from "../api";
import "./Inventory.css"; 

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

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="inventory-container">
      <h1>Inventario</h1>
      <div className="form-container">
        <h2>Agregar Nuevo Producto</h2>
        <form
          className="product-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <div className="input-group">
            <label>
              Nombre:
              <input
                type="text"
                placeholder="Nombre del producto"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
            </label>
            <label>
              Stock:
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
                required
              />
            </label>
            <label>
              Max Stock:
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
                required
              />
            </label>
            <label>
              Costo:
              <input
                type="number"
                placeholder="Costo"
                value={newProduct.cost}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    cost: parseFloat(e.target.value),
                  })
                }
                required
              />
            </label>
            <label>
              Precio Venta:
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
                required
              />
            </label>
          </div>
          <button type="submit" className="create-button">
            Crear Producto
          </button>
        </form>
      </div>
      <h2>Lista de Productos</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Producto</th>
            <th>Número de Piezas</th>
            <th>Fecha de Registro</th>
            <th>Costo</th>
            <th>Precio de Venta</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{new Date(product.created_at).toLocaleDateString()}</td>
              <td>${(Number(product.cost) || 0).toFixed(2)}</td>
              <td>${(Number(product.sale_price) || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
