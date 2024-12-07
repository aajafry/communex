import { LeftSidebar, RightSidebar } from "@/components";
import { AppProvider, ChatProvider } from "@/contexts";
import { SidebarInset, SidebarProvider } from "@/shadcn/components/ui/sidebar";

export const Layout = ({ children }) => {
  return (
    <AppProvider>
      <ChatProvider>
      <SidebarProvider>
        <LeftSidebar />
        <SidebarInset className="overflow-hidden h-dvh">
          {children}
        </SidebarInset>
        <RightSidebar />
      </SidebarProvider>
      </ChatProvider>
    </AppProvider>
  );
};
