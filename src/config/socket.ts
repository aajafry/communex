import { IPayload } from "@/interfaces";
import { getAccessToken } from "@/utilities";
import { jwtDecode } from "jwt-decode";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

const SERVER_URL = import.meta.env.VITE_BACKEND;

const accessToken = getAccessToken();

let decoded: IPayload | null = null;
if (accessToken) {
  try {
    decoded = jwtDecode<IPayload>(accessToken);
  } catch (error: unknown) {
    console.error("Invalid or malformed token", error);
    toast.error("Invalid or expired session. Please log in again.");
    localStorage.removeItem("communex-auth-token");
  }
}

export const socket: Socket = io(SERVER_URL, {
  autoConnect: false,
  query: {
    userId: decoded?.id,
  },
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
