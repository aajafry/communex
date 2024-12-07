import axios from "axios";

const MESSAGE_URL = import.meta.env.VITE_MESSAGE;

export const getUserMessages = async (recipientId, setter) => {
  try {
    const response = await axios.post(
      `${MESSAGE_URL}/messages`,
      {
        id: recipientId,
      },
      {
        withCredentials: true,
      }
    );
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
