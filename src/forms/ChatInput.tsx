import { useApp, useChat } from "@/contexts";
import { handleEmojiSelect } from "@/utilities";
import { EmojiClickData } from "emoji-picker-react";
import { FC, useCallback, useState } from "react";
import { IoSend } from "react-icons/io5";
import { toast } from "sonner";
import { AttachmentButton, EmojiPickerButton } from "./components";

export const ChatInput: FC = () => {
  const [message, setMessage] = useState<string>("");
  const { user, selectedChatType, selectedChatData } = useApp();
  const {
    handleSendDirectMessage: sendDirectMessage,
    handleSendDirectTyping: sendDirectTyping,
    handleSendGroupMessage: sendGroupMessage,
    handleSendGroupTyping: sendGroupTyping,
  } = useChat();

  const handleSendTyping = useCallback(() => {
    if (user && selectedChatData) {
      if (selectedChatType === "user") {
        sendDirectTyping({
          sender: user?.name,
          recipient: selectedChatData?._id!,
        });
      }

      if (selectedChatType === "group") {
        sendGroupTyping({
          sender: user?.name,
          groupId: selectedChatData?._id!,
        });
      }
    }
  }, [
    selectedChatData,
    selectedChatType,
    sendDirectTyping,
    sendGroupTyping,
    user,
  ]);

  const handleSendMessage = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!message.trim()) {
        toast.error("Message cannot be empty.");
        return;
      }

      // send server though using socket connection
      if (selectedChatType === "user") {
        sendDirectMessage({
          sender: user?._id!,
          recipient: selectedChatData?._id!,
          content: message,
        });
      }

      if (selectedChatType === "group") {
        sendGroupMessage({
          groupId: selectedChatData?._id!,
          sender: user?._id!,
          content: message,
        });
      }

      setMessage("");
    },
    [
      message,
      selectedChatData?._id,
      selectedChatType,
      sendDirectMessage,
      sendGroupMessage,
      user?._id,
    ]
  );

  return (
    <form className="flex justify-center items-center px-4 my-4 gap-2">
      <div className="flex-grow flex rounded-full items-center gap-4 px-5 bg-gray-200 dark:bg-neutral-900">
        <input
          type="text"
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleSendTyping}
          autoComplete="off"
          placeholder="Enter Message..."
          className="py-2 rounded-lg flex-1 bg-transparent focus:border-none focus:outline-none"
        />
        <AttachmentButton />
        <EmojiPickerButton
          onEmojiSelect={(emoji: EmojiClickData) =>
            handleEmojiSelect(emoji, setMessage)
          }
        />
      </div>
      <button
        type="submit"
        onClick={(event: React.MouseEvent) => handleSendMessage(event as any)}
        className="bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center p-2"
      >
        <IoSend className="text-2xl text-white" />
      </button>
    </form>
  );
};
