import axios from "axios";
import { env } from "@/config/env";

/**
 * Pre-configured Axios instance for all API requests.
 * Base URL is read from the typed env config layer.
 */
const api = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach auth token when available
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — global error handling placeholder
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiry, network errors, etc.
    return Promise.reject(error);
  }
);

export default api;
