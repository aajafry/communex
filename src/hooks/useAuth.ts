// import { useNavigate } from "react-router";
import { API } from "@/config";
import { IPayload } from "@/interfaces";
import { handleError } from "@/utilities";
import { toast } from "sonner";

type SignupProps = {
  name: string;
  email: string;
  password: string;
};

type LoginProps = {
  email: string;
  password: string;
};

type SignupResponse = {
  message: string;
  user: Partial<IPayload>;
};

type LoginResponse = {
  accessToken: string;
  message: string;
  user: Partial<IPayload>;
};

type LogoutResponse = {
  message: string;
};

export const useAuth = () => {
  // const navigate = useNavigate();

  const signup = async (
    formData: SignupProps
  ): Promise<SignupResponse | null> => {
    try {
      const { data } = await API.post<SignupResponse>(
        "/auth/signup",
        formData,
        {
          withCredentials: false,
        }
      );

      // toast.success(data.message || "User signup successful!");
      // navigate("/", { replace: true });
      return data;
    } catch (error: unknown) {
      toast.error(
        handleError(error, "Failed to signup user. Please try again.")
      );
      return null;
    }
  };

  const login = async (formData: LoginProps): Promise<LoginResponse | null> => {
    try {
      const { data } = await API.post<LoginResponse>("/auth/login", formData);

      // toast.success(data.message || "Login successful!");
      // setAccessToken(data.accessToken)
      // navigate("/", { replace: true });
      return data;
    } catch (error: unknown) {
      toast.error(
        handleError(error, "Failed to login user. Please try again.")
      );
      return null;
    }
  };

  const logout = async (): Promise<LogoutResponse | null> => {
    try {
      const { data } = await API.post<LogoutResponse>("/auth/logout", {});
      // toast.success(data.message || "Logout successful!");
      // removeAccessToken()
      // navigate("/authentication", { replace: true });
      return data;
    } catch (error: unknown) {
      toast.error(
        handleError(error, "Failed to logout user. Please try again.")
      );
      return null;
    }
  };

  return { logout, login, signup };
};
