import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog";
import { UpdateProfileFrom } from "@/forms";
import { FC } from "react";

type PropsType = {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProfileDialog: FC<PropsType> = ({ open, onClose }: PropsType) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-[100vh] sm:h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <UpdateProfileFrom onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
