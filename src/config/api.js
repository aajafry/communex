import { refreshToken } from "@/services";
import axios from "axios";

// Define the API endpoint URL
const SERVER_URL = import.meta.env.VITE_BACKED;

// Create an instance of axios with base URL
const API = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios request interceptor to add token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("communex-auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor to refresh token on 401
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      try {
        // call refresh token API to refresh
        const refreshData = await refreshToken();

        // update local storage with new token
        const newToken = refreshData.accessToken;
        localStorage.setItem("communex-auth-token", newToken);

        // Retry the original request with the new token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        // If refresh token API fails, remove token from local storage and logout
        localStorage.removeItem("communex-auth-token");
        window.location.href = "/authentication";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { API };
