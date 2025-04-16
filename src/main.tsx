import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals/index.scss";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
