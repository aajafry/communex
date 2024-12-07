import { MessageBar, MessageContainer } from "@/components";
import { useApp, useChat } from "@/contexts";
import { ChatInput } from "@/forms";
import { getGroupMessages, getUserMessages } from "@/services";
import { Separator } from "@/shadcn/components/ui/separator";
import { useCallback, useEffect } from "react";

export const Chat = () => {
  const { user, selectedChatType, selectedChatData } = useApp();
  const { setChatMessages } = useChat();

  const fetchDirectChatMessages = useCallback(() => {
    getUserMessages(selectedChatData?._id, setChatMessages);
  }, [selectedChatData?._id, setChatMessages]);

  const fetchGroupChatMessages = useCallback(() => {
    getGroupMessages(selectedChatData?._id, setChatMessages);
  }, [selectedChatData?._id, setChatMessages]);

  useEffect(() => {
    if (
      Object.keys(user).length &&
      Object.keys(selectedChatData).length &&
      selectedChatType === "user"
    ) {
      fetchDirectChatMessages();
    } else if (
      Object.keys(user).length &&
      Object.keys(selectedChatData).length &&
      selectedChatType === "group"
    ) {
      fetchGroupChatMessages();
    }
  }, [
    fetchDirectChatMessages,
    fetchGroupChatMessages,
    selectedChatData,
    selectedChatType,
    user,
  ]);

  return (
    <>
      <MessageBar />
      <Separator className="bg-sidebar-border" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <MessageContainer />
        <Separator className="bg-sidebar-border" />
        <ChatInput />
      </main>
    </>
  );
};
