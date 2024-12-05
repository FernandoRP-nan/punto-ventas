import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Cambia según tu backend
});

// Inventario
export const fetchProducts = () => API.get("/inventory");
export const createProduct = (product) => API.post("/inventory", product);
export const updateProduct = (id, product) =>
  API.put(`/products/${id}`, product);
export const deleteProduct = (id) => API.delete(`/inventory/${id}`);

// Ventas
export const createSale = (sale) => API.post("/sales", sale);
export const fetchSales = () => API.get("/sales");

// Compras
export const createPurchase = (purchase) => API.post("/purchases", purchase);
export const fetchPurchases = () => API.get("/purchases");

// Cortes
export const fetchSalesReport = (params) =>
  API.get("/reports/sales", { params });

// Logs
export const fetchLogs = (params) => API.get("/logs", { params });
