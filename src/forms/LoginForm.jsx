import { Form } from "@/shadcn/components/ui/form";
import { useForm } from "react-hook-form";
import { InputField, SubmitButton } from "./components";
import { useAuth } from "@/hooks";

export const LoginForm = () => {
  const { login } = useAuth();

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

  const handleLoginSubmit = async (data) => {
    await login(data);
    reset();
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
