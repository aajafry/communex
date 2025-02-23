import { API } from "@/config";
import { toast } from "sonner";
import { handleError } from "./handleError";

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await API.post("/cloudinary/delete-image", {
      publicId: `communex/${publicId}`,
    });
  } catch (error: unknown) {
    console.error(handleError(error, "Error removing image from cloudinary."));
    toast.error(handleError(error, "Error removing image from cloudinary."));
  }
};
