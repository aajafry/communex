import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const AUTH_URL = import.meta.env.VITE_AUTH;

export const useAuth = () => {
  const navigate = useNavigate();

  const signup = async (data) => {
    try {
      const response = await axios.post(`${AUTH_URL}/signup`, data);

      if (response.status === 201) {
        toast.success(response.data.message || "User signup successful!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to signup user. Please try again."
      );
    }
  };

  const login = async (data) => {
    try {
      const response = await axios.post(`${AUTH_URL}/login`, data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Login successful!");
        localStorage.setItem("communex-auth-token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to login user. Please try again."
      );
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${AUTH_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message || "Logout successful!");
        localStorage.removeItem("communex-auth-token");
        navigate("/authentication", { replace: true });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to logout user. Please try again."
      );
    }
  };

  return { logout, login, signup };
};
