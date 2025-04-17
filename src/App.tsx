import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ModalWindow from "./components/ModalWindow";
import FormRegister from "./components/FormRegister";
import FormLogin from "./components/FormLogin";
import LeftSidebar from "./components/LeftSidebar";
import { useTheme } from "./contexts/ThemeContext";
import { useUser } from "./contexts/UserContext";
import Redirect from "./components/Redirect";

function App() {
  const { darkTheme } = useTheme();
  const { user } = useUser();
  return (
    <Router>
      <Redirect />
      <div className={`main ${darkTheme ? "theme-dark" : ""}`}>
        {user.role === "registered" && (
          <>
            <LeftSidebar />
            <Routes>
              <Route
                path="/dashboard/all"
                element={<div>Hi there, you are logged in</div>}
              />
            </Routes>
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
              <ModalWindow>
                <FormRegister />
              </ModalWindow>
            }
          />
          {/* Development-only route */}
          <Route
            path="/login-preview"
            element={
              <ModalWindow>
                <FormLogin />
              </ModalWindow>
            }
          />
          {/* Development-only route */}
          <Route path="/left-sidebar-preview" element={<LeftSidebar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
