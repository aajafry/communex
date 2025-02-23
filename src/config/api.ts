import { refreshToken } from "@/services";
import { getAccessToken, removeAccessToken, setAccessToken } from "@/utilities";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Define the API endpoint URL
const SERVER_URL = import.meta.env.VITE_BACKEND;

// Create an instance of axios with base URL
export const API: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios request interceptor to add token to headers
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor to refresh token on 401/403
API.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      try {
        // Attempt to refresh token
        const accessToken = await refreshToken();

        // If refresh token failed, force logout
        if (!accessToken) {
          removeAccessToken();
          window.location.replace("/authentication");
          return Promise.reject(error);
        }

        // update local storage with new token
        setAccessToken(accessToken);

        // Retry the original request with the new token
        const originalRequest = {
          ...error.config,
        } as InternalAxiosRequestConfig;

        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return API(originalRequest);
        }
      } catch (refreshError: unknown) {
        // If refresh token API fails, remove token from local storage and logout
        localStorage.removeItem("communex-auth-token");
        window.location.replace("/authentication");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
