import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ModalWindow from "./components/ModalWindow";
import FormRegister from "./components/FormRegister";
import FormLogin from "./components/FormLogin";
import LeftSidebar from "./components/LeftSidebar";
import { useTheme } from "./contexts/ThemeContext";
import { ModalProvider } from "./contexts/ModalContext";

function App() {
  const { darkTheme } = useTheme();
  return (
    <ModalProvider>
      <Router>
        <div className={`main ${darkTheme ? "theme-dark" : ""}`}>
          <Routes>
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
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
          <ModalWindow />
        </div>
      </Router>
    </ModalProvider>
  );
}

export default App;
