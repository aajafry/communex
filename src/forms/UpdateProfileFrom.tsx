import { Form } from "@/shadcn/components/ui/form";
import { InputField, SubmitButton, AvatarField } from "./components";
import { useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { useApp } from "@/contexts";
import { API } from "@/config";
import { handleError } from "@/utilities";

type PropsType = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateProfileFrom: FC<PropsType> = ({ onClose }: PropsType) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const { user } = useApp();

  const updateProfileFrom = useForm({
    defaultValues: {
      avatar: "",
      name: "",
      email: "",
      password: "",
      address: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = updateProfileFrom;

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar || "");
      Object.keys(user).forEach((key) => {
        if (
          key in user &&
          (key === "avatar" ||
            key === "name" ||
            key === "email" ||
            key === "password" ||
            key === "address")
        ) {
          setValue(
            key as "avatar" | "name" | "email" | "password" | "address",
            user[key as keyof typeof user]?.toString() || ""
          );
        }
      });
    }
  }, [setValue, user]);

  const handleUpdateProfileSubmit = async (data: {
    avatar: string;
    name: string;
    email: string;
    password: string;
    address: string;
  }) => {
    try {
      const updatedData = {
        ...data,
        ...(avatar ? { avatar } : {}),
      };
      const response = await API.put("/user/update", updatedData);

      if (response.status === 200) {
        toast.success("Profile updated successfully.");
        reset();
        onClose(true);
      }
    } catch (error: unknown) {
      toast.error(
        handleError(error, "Failed to update profile. Please try again.")
      );
    }
  };

  return (
    <Form {...updateProfileFrom}>
      <form
        onSubmit={handleSubmit(handleUpdateProfileSubmit)}
        className="space-y-4"
      >
        <AvatarField label="Avatar" avatar={avatar} setAvatar={setAvatar} />
        <InputField
          control={control}
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name address."
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

        <InputField
          control={control}
          name="address"
          label="Address"
          type="text"
          placeholder="Enter your address."
        />

        <SubmitButton
          size="sm"
          type="submit"
          disabled={isSubmitting}
          label="Update Profile"
        />
      </form>
    </Form>
  );
};
