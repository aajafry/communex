import { useApp, useChat } from "@/contexts";
import { useCallback, useState } from "react";
import { IoSend } from "react-icons/io5";
import { toast } from "sonner";
import { AttachmentButton, EmojiPickerButton } from "./components";
import { handleEmojiSelect } from "@/utilities";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { user, selectedChatType, selectedChatData } = useApp();
  const {
    handleSendDirectMessage: sendDirectMessage,
    handleSendDirectTyping: sendDirectTyping,
    handleSendGroupMessage: sendGroupMessage,
    handleSendGroupTyping: sendGroupTyping,
  } = useChat();

  const handleSendTyping = useCallback(() => {
    if (Object.keys(user).length && Object.keys(selectedChatData).length) {
      // send typing indecation to the server though socket connection
      if (selectedChatType === "user") {
        sendDirectTyping({
          sender: user?.name,
          recipient: selectedChatData?._id,
        });
      }

      if (selectedChatType === "group") {
        sendGroupTyping({
          groupId: selectedChatData?._id,
          sender: user?.name,
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
    (event) => {
      event.preventDefault();
      if (!message.trim()) {
        toast.error("Message cannot be empty.");
        return;
      }

      // send server though using socket connection
      if (selectedChatType === "user") {
        sendDirectMessage({
          sender: user?._id,
          recipient: selectedChatData?._id,
          content: message,
        });
      }

      if (selectedChatType === "group") {
        sendGroupMessage({
          groupId: selectedChatData?._id,
          sender: user?._id,
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
          onEmojiSelect={(emoji) => handleEmojiSelect(emoji, setMessage)}
        />
      </div>
      <button
        type="submit"
        onClick={(event) => handleSendMessage(event)}
        className="bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center p-2"
      >
        <IoSend className="text-2xl text-white" />
      </button>
    </form>
  );
};
