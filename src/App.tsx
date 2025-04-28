import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ModalWindow from "./components/ModalWindow";
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
              <Route path="all" element={<div> Dashboard all </div>} />
              <Route
                path="statistics"
                element={<div>Dashboard Statistics</div>}
              />
              <Route
                path="*"
                element={
                  <div>
                    <h1>404</h1>
                    <p>Nested page not found </p>
                  </div>
                }
              />
            </Route>
          )}
          {user.role === "unregistered" && (
            <Route path="/welcome" element={<Welcome />} />
          )}
          <Route
            path="*"
            element={
              <div className="main">
                <h1>404</h1>
                <p>Page not found</p>
              </div>
            }
          />
        </Routes>
        <ModalWindow />
      </div>
    </ModalProvider>
  );
}

export default App;
