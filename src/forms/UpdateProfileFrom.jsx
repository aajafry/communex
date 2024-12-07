import { Form } from "@/shadcn/components/ui/form";
import { InputField, SubmitButton, AvatarField } from "./components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useApp } from "@/contexts";

const USER_URL = import.meta.env.VITE_USER;

export const UpdateProfileFrom = ({ onClose }) => {
  const [avatar, setAvatar] = useState(null);
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
        setValue(key, user[key]);
      });
    }
  }, [setValue, user]);

  const handleUpdateProfileSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        ...(avatar ? { avatar } : {}),
      };
      const response = await axios.put(`${USER_URL}/update`, updatedData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Profile updated successfully.");
        reset();
        onClose();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile. Please try again."
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
