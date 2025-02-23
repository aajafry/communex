import { toast } from "sonner";
import { uploadToCloudinary } from "./uploadToCloudinary";
import { handleError } from "./handleError";

export const handleAttachmentChange = async (
  event: React.ChangeEvent<HTMLInputElement>
): Promise<void> => {
  try {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }
    const imageUrl = await uploadToCloudinary(file, "communex");

    if (imageUrl) {
      toast.success(`Image successfully uploaded ${imageUrl}`);
    }
  } catch (error: unknown) {
    toast.error(
      handleError(error, "Failed to upload image. Please try again.")
    );
  }
};
