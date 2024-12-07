import { useApp } from "@/contexts";
import { useAuth } from "@/hooks";
import { deleteUserAccount } from "@/services";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import {
  SidebarFooter as ShadcnSidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shadcn/components/ui/sidebar";
import { cn } from "@/shadcn/lib/utils";
import { Ellipsis, User2 } from "lucide-react";
import { useNavigate } from "react-router";

export const SidebarFooter = ({ onOpenDialog }) => {
  const { user } = useApp();
  const navigate = useNavigate();
  const { logout: handleLogoutSubmit } = useAuth();

  return (
    <ShadcnSidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                className={cn(
                  "justify-start items-center gap-2 pl-0",
                  "group-data-[collapsible=icon]:!p-0"
                )}
              >
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user?.avatar} alt={user?.name} />

                  <AvatarFallback>
                    <User2 />
                  </AvatarFallback>
                </Avatar>
                <span className="flex-grow text-left">{user?.name}</span>
                <Ellipsis />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onOpenDialog(true)}
              >
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleLogoutSubmit()}
              >
                <span>Sign out</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => deleteUserAccount(navigate)}
              >
                <span>Leave</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </ShadcnSidebarFooter>
  );
};
