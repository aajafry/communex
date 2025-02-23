import { useApp, useChat } from "@/contexts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { Dot, User2 } from "lucide-react";
import { FC } from "react";

export const MessageContainer: FC = () => {
  const { user } = useApp();
  const { typingUser, chatMessages } = useChat();

  return (
    <section
      className={`flex-1 overflow-y-auto chat-container px-4 py-2 ${
        chatMessages.length === 0 ? "flex items-center justify-center" : ""
      }`}
    >
      {chatMessages.length > 0 ? (
        <div className="flex flex-col gap-4">
          {chatMessages.map(({ content, createdAt, sender }, index) => (
            <div
              key={index}
              className={`${
                sender?._id === user?._id ? "flex-row-reverse" : "flex-row"
              } flex gap-2 items-end`}
            >
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={sender?.avatar} alt={sender?.name} />
                  <AvatarFallback>
                    <User2 />
                  </AvatarFallback>
                </Avatar>
                <Dot className="text-green-600 !h-12 !w-12 absolute bottom-0 left-0 translate-x-[0%] translate-y-[40%]" />
              </div>
              <div
                className={`
                      ${
                        sender?._id === user?._id
                          ? "bg-blue-300"
                          : "bg-pink-300"
                      }
                     p-3 rounded-lg shadow-sm`}
              >
                <p className="text-gray-800">{content}</p>
                <small className="text-gray-500">
                  {createdAt && new Date(createdAt).toLocaleTimeString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">
          No messages yet. <br /> Send a message to see it appear here.
        </p>
      )}
      {typingUser && (
        <p className="mt-2 text-sm text-gray-500 animate-pulse">
          {typingUser} is typing...
        </p>
      )}
    </section>
  );
};
