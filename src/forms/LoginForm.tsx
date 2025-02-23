import { Form } from "@/shadcn/components/ui/form";
import { useForm } from "react-hook-form";
import { InputField, SubmitButton } from "./components";
import { useAuth } from "@/hooks";
import { FC } from "react";
import { setAccessToken } from "@/utilities";
import { toast } from "sonner";
import { useNavigate } from "react-router";

type LoginProps = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = loginForm;

  const handleLoginSubmit = async (formData: LoginProps) => {
    const data = await login(formData);
    if (data) {
      toast.success(data.message || `User ${data.user.name} login successful!`);
      setAccessToken(data.accessToken);
      reset();
      navigate("/", { replace: true });
    }
  };

  return (
    <Form {...loginForm}>
      <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-4">
        <InputField
          control={control}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email address."
        />

        <InputField
          control={control}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password."
        />
        <SubmitButton
          size="sm"
          type="submit"
          disabled={isSubmitting}
          label="Login"
        />
      </form>
    </Form>
  );
};
