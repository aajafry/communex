import { useApp } from "@/contexts";
import { SlidebarToggle } from "@/components";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { Dot, User2 } from "lucide-react";

export const MessageBar = () => {
  const { selectedChatData, selectedChatType } = useApp();

  return Object.keys(selectedChatData).length ? (
    <header className="flex items-center px-4 min-h-[48px]">
      <SlidebarToggle />

      <div className="relative">
        <Avatar className="h-8 w-8 mr-4">
          <AvatarImage
            src={selectedChatData?.avatar}
            alt={selectedChatData?.name}
          />
          <AvatarFallback>
            <User2 />
          </AvatarFallback>
        </Avatar>
        {selectedChatType === "user" && (
          <Dot
            className={`${
              selectedChatData.isOnline ? "text-green-600" : "text-rose-500"
            } !h-12 !w-12 absolute bottom-0 left-0 translate-x-[20%] translate-y-[40%]`}
          />
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <h2 className="font-bold capitalize">{selectedChatData?.name}</h2>
        {selectedChatType === "user" && (
          <span className="text-gray-500">
            {selectedChatData.isOnline ? "online" : "offline"}
          </span>
        )}
      </div>
    </header>
  ) : null;
};
