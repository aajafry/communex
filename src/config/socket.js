import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { toast } from "sonner";

const SERVER_URL = import.meta.env.VITE_BACKED;

const token = localStorage.getItem("communex-auth-token");

let decoded = null;
if (token) {
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    toast.error(`Invalid or malformed token: ${error.message}`);
  }
}

export const socket = io(SERVER_URL, {
  autoConnect: false,
  query: {
    userId: decoded?.id,
  },
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
