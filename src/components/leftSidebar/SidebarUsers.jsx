import { useApp } from "@/contexts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shadcn/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shadcn/components/ui/sidebar";
import { ChevronRight, Dot, User, User2 } from "lucide-react";

export const SidebarUsers = () => {
  const { users, user: currentUser, setSelectedChatData, setSelectedChatType } = useApp();
  const filteredUsers = users.filter(user => user._id !== currentUser._id)
  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger className="w-full">
              <SidebarMenuButton className="justify-start items-center gap-2 pl-0">
                <User />
                <span className="flex-grow text-left">People</span>
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </SidebarMenuItem>
          <CollapsibleContent>
            <SidebarGroupContent className="flex flex-col">
              {filteredUsers?.map((user) => {
                return (
                  <SidebarMenuItem key={user._id}>
                    <SidebarMenuButton
                      className="justify-start items-center gap-2 pl-0 relative"
                      onClick={() => {
                        setSelectedChatData(user);
                        setSelectedChatType("user");
                      }}
                    >
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={user.avatar} alt={user.name} />

                        <AvatarFallback>
                          <User2 />
                        </AvatarFallback>
                      </Avatar>
                      <span className="flex-grow text-left">{user.name}</span>
                      <Dot
                        className={`${
                          user.isOnline ? "text-green-600" : "text-rose-600"
                        } !h-8 !w-8 absolute bottom-0 left-0 translate-x-[20%] translate-y-[20%]`}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
};
