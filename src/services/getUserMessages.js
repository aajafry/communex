import { API } from "@/config";

export const getUserMessages = async (recipientId, setter) => {
  try {
    const response = await API.post("/message/messages", {
      id: recipientId,
    });
    if (response.status === 200) {
      setter(response.data.messages || []);
    }
  } catch (error) {
    console.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch messages. Please try again."
    );
    setter([]);
  }
};
