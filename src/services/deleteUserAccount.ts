import { API } from "@/config";
import { handleError } from "@/utilities";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";

type DeleteUserAccountResponse = {
  message: string;
};

export const deleteUserAccount = async (
  navigate?: NavigateFunction
): Promise<DeleteUserAccountResponse | null> => {
  try {
    const { data } = await API.delete<DeleteUserAccountResponse>(
      "/user/delete"
    );
    if (navigate) {
      // toast.success(data.message || "User leave successful!");
      // removeAccessToken();
      // navigate("/authentication", { replace: true });
    }
    return data;
  } catch (error: unknown) {
    toast.error(handleError(error, "Failed to leave User. Please try again."));
    return null;
  }
};
