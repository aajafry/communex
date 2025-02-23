import { getAccessToken, removeAccessToken, isTokenExpired } from "@/utilities";
import { ReactNode } from "react";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = getAccessToken();

  if (!token || (token && isTokenExpired(token))) {
    removeAccessToken();
    return <Navigate to="/authentication" replace />;
  } else {
    return children;
  }
};
