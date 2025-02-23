import { API } from "@/config";
import { useApp } from "@/contexts";
import { Form } from "@/shadcn/components/ui/form";
import { handleError } from "@/utilities";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  AvatarField,
  InputField,
  MultipleSelector,
  SubmitButton,
} from "./components";

type PropsType = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateGroupForm: FC<PropsType> = ({ onClose }: PropsType) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { users } = useApp();
  const createFrom = useForm({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isSubmitting },
  } = createFrom;

  const memberOptions = users?.map((member) => ({
    value: member._id!,
    label: member.email,
  }));

  const handleSelectChange = (name: string, selectedValues: string[]) => {
    setSelectedUsers(selectedValues);
    setValue(name as "members", selectedValues as never[]);
  };

  const handleGroupCreate = useCallback(
    async (data: { name: string; members: string[] }) => {
      try {
        const finalData = {
          ...data,
          ...(avatar ? { avatar } : {}),
        };
        const response = await API.post("/group/create", finalData);
        if (response.status === 201) {
          toast.success(response.data.message || "Group created successfully.");
          onClose(true);
          reset();
        }
      } catch (error) {
        toast.error(
          handleError(error, "Failed to create group. Please try again.")
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
