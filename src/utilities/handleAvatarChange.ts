import { toast } from "sonner";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  handleError,
} from "./index.js";
import React from "react";

export const handleAvatarChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  avatar: string | null,
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
  try {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    // Extract publicId from existing avatar safely
    const publicId = avatar ? avatar.split("/").pop()?.split(".")[0] : null;

    // Perform deletion and upload in parallel for efficiency
    const [deleteResult, uploadResult] = await Promise.allSettled([
      publicId ? deleteFromCloudinary(publicId) : Promise.resolve(null),
      uploadToCloudinary(file, "communex"),
    ]);

    // Handle Upload
    if (uploadResult.status === "fulfilled" && uploadResult.value) {
      setAvatar(uploadResult.value);
      toast.success("New avatar was added");
    } else {
      toast.error("Failed to upload new avatar. Please try again.");
    }

    // Handle Deletion Errors (if any)
    if (deleteResult.status === "rejected") {
      console.error("Failed to delete old avatar:", deleteResult.reason);
    }
  } catch (error: unknown) {
    console.error(
      handleError(error, "Something went wrong. Please try again.")
    );
    toast.error(handleError(error, "Something went wrong. Please try again."));
  }
};
