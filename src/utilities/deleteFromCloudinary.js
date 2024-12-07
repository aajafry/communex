import axios from "axios";
import { toast } from "sonner";

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY;

export const deleteFromCloudinary = async (publicId) => {
  try {
    await axios.post(
      `${CLOUDINARY_URL}/delete-image`,
      { publicId: `communex/${publicId}` },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("error removing image from cloudinary: ", error);
    toast.error("error removing image from cloudinary.");
  }
};
