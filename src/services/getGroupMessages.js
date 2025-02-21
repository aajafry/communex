import { API } from "@/config";

export const getGroupMessages = async (groupId, setter) => {
  try {
    const response = await API.post("/group/getGroupMessages", {
      id: groupId,
    });

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
