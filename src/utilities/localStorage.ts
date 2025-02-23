import { jwtDecode, JwtPayload } from "jwt-decode";

// Set access token in local storage
const setAccessToken = (token: string): void => {
  localStorage.setItem("communex-auth-token", token);
};

// Get token from local storage
const getAccessToken = (): string | null => {
  return localStorage.getItem("communex-auth-token");
};

// Remove access token from local storage
const removeAccessToken = (): void => {
  localStorage.removeItem("communex-auth-token");
};

// Check if token is expired  (decoded token must have exp property)  - JWTDecode library is used for this purpose
const isTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token);
  if (!decoded.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};

export { getAccessToken, isTokenExpired, removeAccessToken, setAccessToken };
