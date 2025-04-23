import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ModalWindow from "./components/ModalWindow";
import LeftSidebar from "./components/LeftSidebar";
import { useTheme } from "./contexts/ThemeContext";
import { useUser } from "./contexts/UserContext";
import Redirect from "./components/Redirect";
import { ModalProvider } from "./contexts/ModalContext";
import RightSidebar from "./components/RightSidebar";


function App() {
  const { darkTheme } = useTheme();
  const { user } = useUser();
  return (
    <ModalProvider>
      <Router>
        <Redirect />
        <div className={`main ${darkTheme ? "theme-dark" : ""}`}>
          {user.role === "registered" && (
            <>
              <LeftSidebar />
              <div className="dashboard">
                <Routes>
                  <Route
                    path="/dashboard/all"
                    element={<div> Dashboard all </div>}
                  />
                  <Route
                    path="/dashboard/statistics"
                    element={<div>Dashboard Statistics</div>} />
                </Routes>
              </div>
              <RightSidebar />
            </>
          )}
          <Routes>
            {user.role === "unregistered" && (
              <Route path="/welcome" element={<Welcome />} />
            )}
            {/* Development-only route */}
            <Route
              path="/"
              element={
                ''
              }
            />
            {/* Development-only route */}
            <Route
              path="/login-preview"
              element={
                ''
              }
            />
            {/* Development-only route */}
            <Route path="/left-sidebar-preview" element={<LeftSidebar />} />
          </Routes>
          <ModalWindow />
        </div>
      </Router>
    </ModalProvider>
  );
}

export default App;
