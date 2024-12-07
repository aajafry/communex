import { getToken } from "@/utilities";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    localStorage.removeItem("communexToken");
    return <Navigate to="/authentication" replace />;
  } else {
    return children;
  }
};
