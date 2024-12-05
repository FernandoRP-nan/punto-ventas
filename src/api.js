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

// Cortes de ventas
export const fetchSalesCuts = async (date) => {
  try {
    const response = await API.get("/sales/cuts", { params: { date } });
    const data = response.data;

    // Asegúrate de que la respuesta tenga las propiedades esperadas
    return {
      morning_sales: Number(data.morning_sales) || 0,
      evening_sales: Number(data.evening_sales) || 0,
    };
  } catch (error) {
    console.error("Error fetching sales cuts:", error);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};
