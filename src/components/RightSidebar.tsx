import { useApp } from "@/contexts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { Sidebar } from "@/shadcn/components/ui/sidebar";
import { Dot, User2 } from "lucide-react";
import { FC } from "react";
import { IUser } from "@/interfaces";

export const RightSidebar: FC = () => {
  const { selectedChatData, selectedChatType } = useApp();

  return (
    <Sidebar
      side="right"
      collapsible="none"
      className={`${
        !selectedChatType && "!hidden"
      } h-screen hidden lg:flex w-[20rem]`}
    >
      {selectedChatType === "user" && (
        <>
          <div className="relative">
            <Avatar className="h-24 w-24 mt-8 mx-auto">
              <AvatarImage
                src={selectedChatData?.avatar}
                alt={selectedChatData?.name}
              />
              <AvatarFallback>
                <User2 />
              </AvatarFallback>
            </Avatar>
            <Dot
              className={`${
                (selectedChatData as IUser)?.isOnline
                  ? "text-green-600"
                  : "text-rose-600"
              } !h-12 !w-12 absolute bottom-0 left-[50%] translate-x-[10%] translate-y-[30%]`}
            />
          </div>
          <div className="flex flex-col gap-2 px-4 pt-4 capitalize">
            <h2 className="font-medium text-sidebar-foreground">
              name:{" "}
              <span className="text-muted-foreground font-normal ml-2">
                {selectedChatData?.name || "N/A"}
              </span>
            </h2>
            <h2 className="font-medium text-sidebar-foreground">
              email:{" "}
              <span className="text-muted-foreground lowercase font-normal ml-2">
                {(selectedChatData as IUser)?.email || "N/A"}
              </span>
            </h2>
            <h2 className="font-medium text-sidebar-foreground">
              address:
              <span className="text-muted-foreground font-normal ml-2">
                {(selectedChatData as IUser)?.address || "N/A"}
              </span>
            </h2>
          </div>
        </>
      )}
      {selectedChatType === "group" && (
        <>
          <Avatar className="h-24 w-24 mt-8 mx-auto">
            <AvatarImage
              src={selectedChatData?.avatar}
              alt={selectedChatData?.name}
            />
            <AvatarFallback>
              <User2 />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 px-4 pt-4 capitalize">
            <h2 className="font-medium ml-6 mt-6 text-sidebar-foreground">
              name:{" "}
              <span className="text-muted-foreground font-normal ml-2">
                {selectedChatData?.name || "N/A"}
              </span>
            </h2>
          </div>
        </>
      )}
    </Sidebar>
  );
};
