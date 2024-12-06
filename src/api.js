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

    return {
      morning_sales: Number(data.morning_sales) || 0,
      evening_sales: Number(data.evening_sales) || 0,
    };
  } catch (error) {
    console.error("Error fetching sales cuts:", error);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};

// Logs
export const fetchInventoryLogs = () => API.get("/inventory/inventory-logs");

export const fetchLoginLogs = () => API.get("/login-logs");

// Función para cerrar sesión
export const logout = async (token) => {
  try {
    await API.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error; 
  }
};
