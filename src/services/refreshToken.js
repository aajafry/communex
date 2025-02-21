import { API } from "@/config";
import { toast } from "sonner";

export const refreshToken = async () => {
  try {
    const response = await API.post("/auth/refresh-token", {});
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to signup user. Please try again."
    );
  }
};
