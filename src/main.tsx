import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { ThemeProvider } from "@/contexts";
import { Toaster } from "@/shadcn/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="communex-ui-theme">
    <App />
    <Toaster richColors closeButton />
  </ThemeProvider>
);
