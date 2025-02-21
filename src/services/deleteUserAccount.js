import { API } from "@/config";
import { toast } from "sonner";

export const deleteUserAccount = async (navigate) => {
  try {
    const response = await API.delete("/user/delete");
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
