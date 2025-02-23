import { FC, useState } from "react";
import { Separator } from "@/shadcn/components/ui/separator";
import { Sidebar, SidebarContent } from "@/shadcn/components/ui/sidebar";
import {
  SidebarGroups,
  SidebarHeader,
  SidebarUsers,
  SidebarFooter,
  GroupDialog,
  ProfileDialog,
} from "@/components/leftSidebar/index";

export const LeftSidebar: FC = () => {
  const [groupOpenModel, setGroupOpenModel] = useState<boolean>(false);
  const [profileOpenModel, setProfileOpenModel] = useState<boolean>(false);

  return (
    <>
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader />
        <Separator className="bg-sidebar-border" />
        <SidebarContent className="gap-0">
          <SidebarUsers />
          <SidebarGroups onOpenDialog={setGroupOpenModel} />
        </SidebarContent>
        <Separator className="bg-sidebar-border" />
        <SidebarFooter onOpenDialog={setProfileOpenModel} />
      </Sidebar>

      <GroupDialog open={groupOpenModel} onClose={setGroupOpenModel} />
      <ProfileDialog open={profileOpenModel} onClose={setProfileOpenModel} />
    </>
  );
};
