import { CreateGroupFrom } from "@/forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog";

export const GroupDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-[100vh] sm:h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Please fill up the details for new Group.
          </DialogDescription>
        </DialogHeader>
        <CreateGroupFrom onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
