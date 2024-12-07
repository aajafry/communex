import axios from "axios";
import { toast } from "sonner";

const USER_URL = import.meta.env.VITE_USER;

export const deleteUserAccount = async (navigate) => {
  try {
    const response = await axios.delete(`${USER_URL}/delete`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      toast.success(response.data.message || "User leave successful!");
      localStorage.removeItem("communex-auth-token");
      navigate("/authentication", { replace: true });
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to leave User. Please try again."
    );
  }
};
