import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { getToken } from "@/utilities";

const BACKEND_URL = import.meta.env.VITE_BACKED;

const token = getToken();

let decoded = null;
if (token) {
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    toast.error(`Invalid or malformed token: ${error.message}`);
  }
}

export const socket = io(BACKEND_URL, {
  autoConnect: false,
  query: {
    userId: decoded?.id,
  },
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
