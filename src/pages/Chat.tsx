import { MessageBar, MessageContainer } from "@/components";
import { useApp, useChat } from "@/contexts";
import { ChatInput } from "@/forms";
import { getGroupMessages, getUserMessages } from "@/services";
import { Separator } from "@/shadcn/components/ui/separator";
import { FC, useCallback, useEffect } from "react";

export const Chat: FC = () => {
  const { user, selectedChatType, selectedChatData } = useApp();
  const { setChatMessages } = useChat();

  const fetchDirectChatMessages = useCallback(async () => {
    if (selectedChatData?._id) {
      const responseMessage = await getUserMessages(selectedChatData._id);
      setChatMessages(responseMessage);
    }
  }, [selectedChatData?._id, setChatMessages]);

  const fetchGroupChatMessages = useCallback(async () => {
    if (selectedChatData?._id) {
      const responseMessage = await getGroupMessages(selectedChatData._id);
      setChatMessages(responseMessage);
    }
  }, [selectedChatData?._id, setChatMessages]);

  useEffect(() => {
    if (user && selectedChatData && selectedChatType === "user") {
      fetchDirectChatMessages();
    } else if (user && selectedChatData && selectedChatType === "group") {
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
