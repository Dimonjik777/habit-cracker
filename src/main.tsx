import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals/index.scss";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { SidebarProvider } from "./contexts/SidebarContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <UserProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
