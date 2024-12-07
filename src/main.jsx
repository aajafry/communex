import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./shadcn/components/ui/sonner";
import { ThemeProvider } from "./contexts";

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="system" storageKey="communex-ui-theme">
    <App />
    <Toaster richColors={true} closeButton={true} />
  </ThemeProvider>
);
