import axios from "axios";

const GROUP_URL = import.meta.env.VITE_GROUP;

export const getGroupMessages = async (groupId, setter) => {
  try {
    const response = await axios.post(
      `${GROUP_URL}/getGroupMessages`,
      {
        id: groupId,
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
        "Failed to fetch group chat messages. Please try again."
    );
    setter([]);
  }
};
