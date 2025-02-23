import { CreateGroupForm } from "@/forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog";
import { FC } from "react";

type PropsType = {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GroupDialog: FC<PropsType> = ({ open, onClose }: PropsType) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-[100vh] sm:h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Please fill up the details for new Group.
          </DialogDescription>
        </DialogHeader>
        <CreateGroupForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
