import { handleError } from "@/utilities";
import axios from "axios";
import { toast } from "sonner";

const SERVER_URL: string = import.meta.env.VITE_BACKED;

export const refreshToken = async (): Promise<string | null> => {
  try {
    const { data } = await axios.post<{ accessToken: string }>(
      `${SERVER_URL}/auth/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );
    return data.accessToken;
  } catch (error: unknown) {
    toast.error(
      handleError(error, "Failed to refresh token. Please log in again.")
    );
    return null;
  }
};
