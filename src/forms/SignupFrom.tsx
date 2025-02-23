import { Form } from "@/shadcn/components/ui/form";
import { InputField, SubmitButton } from "./components";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { FC } from "react";

type SignupProps = {
  name: string;
  email: string;
  password: string;
};

export const SignupFrom: FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const signupFrom = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = signupFrom;

  const handleSignupSubmit = async (formData: SignupProps) => {
    const data = await signup(formData);
    if (data) {
      toast.success(
        data.message || `User ${data.user.name} signup successful!`
      );
      reset();
      navigate("/", { replace: true });
    }
  };

  return (
    <Form {...signupFrom}>
      <form onSubmit={handleSubmit(handleSignupSubmit)} className="space-y-4">
        <InputField
          control={control}
          name="name"
          label="Name"
          placeholder="Enter your name."
        />

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
          label="Signup"
        />
      </form>
    </Form>
  );
};
