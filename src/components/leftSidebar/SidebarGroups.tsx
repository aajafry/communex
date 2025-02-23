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
import { ChevronRight, Plus, User2, Users } from "lucide-react";
import React, { FC } from "react";

type PropsType = {
  onOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarGroups: FC<PropsType> = ({ onOpenDialog }: PropsType) => {
  const { groups, setSelectedChatData, setSelectedChatType } = useApp();
  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger className="w-full">
              <SidebarMenuButton className="justify-start items-center gap-2 pl-0">
                <Users />
                <span className="flex-grow text-left">Group</span>
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </SidebarMenuItem>
          <CollapsibleContent>
            <SidebarGroupContent className="flex flex-col">
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => onOpenDialog(true)}>
                  <Plus />
                  <span>Create Group</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {groups?.map((group) => (
                <SidebarMenuItem key={group._id}>
                  <SidebarMenuButton
                    className="justify-start items-center gap-2 pl-0 relative"
                    onClick={() => {
                      setSelectedChatData(group);
                      setSelectedChatType("group");
                    }}
                  >
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={group.avatar} alt={group.name} />

                      <AvatarFallback>
                        <User2 />
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex-grow text-left">{group.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
};
