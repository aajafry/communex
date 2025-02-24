import { Button } from "@/shadcn/components/ui/button";
import { useSidebar } from "@/shadcn/components/ui/sidebar";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { FC } from "react";

export const SlidebarToggle: FC = () => {
  const { open, toggleSidebar } = useSidebar();
  return (
    <Button size="icon" variant="link" onClick={toggleSidebar}>
      {open ? <CircleArrowLeft /> : <CircleArrowRight />}
    </Button>
  );
};
