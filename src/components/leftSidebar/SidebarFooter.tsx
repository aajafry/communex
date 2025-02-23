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
import { removeAccessToken } from "@/utilities";
import { Ellipsis, User2 } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type PropsType = {
  onOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarFooter: FC<PropsType> = ({ onOpenDialog }: PropsType) => {
  const { user } = useApp();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogoutSubmit = async () => {
    const data = await logout();
    if (data) {
      toast.success(data.message || "Logout successful!");
      removeAccessToken();
      navigate("/authentication", { replace: true });
    }
  };

  const handleUserAccount = async () => {
    const data = await deleteUserAccount();
    if (data) {
      toast.success(data.message || "User leave successful!");
      removeAccessToken();
      navigate("/authentication", { replace: true });
    }
  };

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
                onClick={handleLogoutSubmit}
              >
                <span>Sign out</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleUserAccount}
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
