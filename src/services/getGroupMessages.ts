import { API } from "@/config";
import { IMessage } from "@/interfaces";
import { handleError } from "@/utilities";
import React from "react";

export const getGroupMessages = async (
  groupId: string,
  setter?: React.Dispatch<React.SetStateAction<IMessage[]>>
): Promise<IMessage[]> => {
  try {
    const { data } = await API.post<{ messages: IMessage[] }>(
      "/group/getGroupMessages",
      {
        id: groupId,
      }
    );

    const messages = data?.messages || [];
    setter?.(messages);

    return messages;
  } catch (error) {
    console.error(
      handleError(
        error,
        "Failed to fetch group chat messages. Please try again."
      )
    );
    setter?.([]);
    return [];
  }
};
