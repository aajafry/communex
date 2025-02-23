import { API } from "@/config";
import { IMessage } from "@/interfaces";
import { handleError } from "@/utilities";

export const getUserMessages = async (
  recipientId: string,
  setter?: React.Dispatch<React.SetStateAction<IMessage[]>>
): Promise<IMessage[]> => {
  try {
    const { data } = await API.post<{ messages: IMessage[] }>(
      "/message/messages",
      {
        id: recipientId,
      }
    );
    const messages = data?.messages || [];
    setter?.(messages);

    return messages;
  } catch (error: unknown) {
    console.error(
      handleError(error, "Failed to fetch messages. Please try again.")
    );
    setter?.([]);
    return [];
  }
};
