import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals/index.scss";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { SidebarProvider } from "./contexts/SidebarContext.tsx";
import { HabitProvider } from "./contexts/HabitContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Loading } from "./components/Loading.tsx";

const App = React.lazy(() => import("./App"));
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <Router>
        <ThemeProvider>
          <UserProvider>
            <SidebarProvider>
              <HabitProvider>
                <App />
              </HabitProvider>
            </SidebarProvider>
          </UserProvider>
        </ThemeProvider>
      </Router>
    </Suspense>
  </StrictMode>
);
