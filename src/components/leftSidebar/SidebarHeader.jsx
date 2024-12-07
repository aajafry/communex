import {
  SidebarHeader as ShadcnSidebarHeader,
  SidebarMenuButton,
} from "@/shadcn/components/ui/sidebar";
import { ModeToggle } from "@/components";
import { Link } from "react-router";
import { Home } from "lucide-react";
import { useSidebar } from "@/shadcn/components/ui/sidebar";

export const SidebarHeader = () => {
  const { open } = useSidebar();

  return (
    <ShadcnSidebarHeader className="flex-between flex-row">
      <SidebarMenuButton asChild>
        <Link to="/" className="font-semibold tracking-wider">
          <Home /> communeX
        </Link>
      </SidebarMenuButton>
      {open && <ModeToggle />}
    </ShadcnSidebarHeader>
  );
};
