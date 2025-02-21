import { API } from "@/config";
import { toast } from "sonner";

export const deleteFromCloudinary = async (publicId) => {
  try {
    await API.post("/cloudinary/delete-image", {
      publicId: `communex/${publicId}`,
    });
  } catch (error) {
    console.error("error removing image from cloudinary: ", error);
    toast.error("error removing image from cloudinary.");
  }
};
