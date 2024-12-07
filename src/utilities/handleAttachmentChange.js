import { toast } from "sonner";
import { uploadToCloudinary } from "./uploadToCloudinary";

export const handleAttachmentChange = async (event) => {
  try {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = await uploadToCloudinary(file, "communex");

      if (imageUrl) {
        toast.success(`Image successfully uploaded ${imageUrl}`);
      }
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to upload image. Please try again."
    );
  }
}
