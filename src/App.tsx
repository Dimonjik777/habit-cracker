import { Routes, Route, useLocation } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ModalWindow from "./components/ModalWindow";
import LeftSidebar from "./components/LeftSidebar";
import { useTheme } from "./contexts/ThemeContext";
import { useUser } from "./contexts/UserContext";
import Redirect from "./components/Redirect";
import { ModalProvider } from "./contexts/ModalContext";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  const { darkTheme } = useTheme();
  const { user } = useUser();
  return (
    <ModalProvider>
      <Redirect />
      <div className={`main ${darkTheme ? "theme-dark" : ""}`}>
        <Routes>
          {user.role === "registered" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route
                path="/dashboard/all"
                element={<div> Dashboard all </div>}
              />
              <Route
                path="/dashboard/statistics"
                element={<div>Dashboard Statistics</div>}
              />
            </Route>
          )}
          {user.role === "unregistered" && (
            <Route path="/welcome" element={<Welcome />} />
          )}
          {/* Development-only route */}
          <Route path="/" element={""} />
          {/* Development-only route */}
          <Route path="/login-preview" element={""} />
          {/* Development-only route */}
          <Route path="/left-sidebar-preview" element={<LeftSidebar />} />
        </Routes>
        <ModalWindow />
      </div>
    </ModalProvider>
  );
}

export default App;
