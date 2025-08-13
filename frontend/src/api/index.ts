import axios from "axios";

// Set base URL depending on environment
const api_url = "https://portfolio-builder-backend-dwuj.onrender.com/api";
// const api_url = "http://localhost:5000/api";

// Create Axios instance
const api = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("req", { token });

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });

      // Optional: Auto-logout or redirect on 401
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        // Optionally redirect:
        // window.location.href = "/signin";
      }
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Axios config error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
