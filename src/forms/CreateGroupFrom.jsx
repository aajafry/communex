import { useApp } from "@/contexts";
import { Form } from "@/shadcn/components/ui/form";
import axios from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  AvatarField,
  InputField,
  MultipleSelector,
  SubmitButton,
} from "./components";

export const CreateGroupFrom = ({ onClose }) => {
  const [avatar, setAvatar] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users } = useApp();
  const createFrom = useForm({});

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isSubmitting },
  } = createFrom;

  const memberOptions = users?.map((member) => ({
    value: member._id,
    label: member.email,
  }));

  const handleSelectChange = (name, selectedValues) => {
    setSelectedUsers(selectedValues);
    setValue(name, selectedValues);
  };

  const handleGroupCreate = useCallback(
    async (data) => {
      try {
        const finalData = {
          ...data,
          ...(avatar ? { avatar } : {}),
        };
        const response = await axios.post("/group/create", finalData);
        if (response.status === 201) {
          toast.success(response.data.message || "Group created successfully.");
          onClose();
          reset();
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to create group. Please try again."
        );
      }
    },
    [avatar, onClose, reset]
  );

  return (
    <Form {...createFrom}>
      <form onSubmit={handleSubmit(handleGroupCreate)} className="space-y-4">
        <AvatarField label="Avatar" avatar={avatar} setAvatar={setAvatar} />

        <InputField
          control={control}
          name="name"
          label="Group Name"
          type="name"
          placeholder="Enter your group name."
        />

        <MultipleSelector
          name="members"
          options={memberOptions}
          onChange={handleSelectChange}
          value={selectedUsers}
        />

        <SubmitButton
          size="sm"
          type="submit"
          disabled={isSubmitting}
          label="Create Group"
        />
      </form>
    </Form>
  );
};
