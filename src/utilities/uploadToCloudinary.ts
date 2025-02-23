import axios from "axios";
import { toast } from "sonner";
import { handleError } from "./handleError";

const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (
  file: File,
  folder: string
): Promise<string | null> => {
  if (!file.type.startsWith("image/")) {
    toast.error("Only image files are allowed.");
    return null;
  }

  if (file.size > 5 * 1024 * 1024) {
    // 5MB limit
    toast.error("Image size should be less than 5MB.");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);
  formData.append("folder", folder);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    return response.data.secure_url as string;
  } catch (error: unknown) {
    console.error(handleError(error, "Error uploading image to Cloudinary."));
    toast.error(handleError(error, "Error uploading image to Cloudinary."));
    return null;
  }
};
