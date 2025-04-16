import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ModalWindow from "./components/ModalWindow";
import FormRegister from "./components/FormRegister";
import FormLogin from "./components/FormLogin";
import LeftSidebar from "./components/LeftSidebar";

function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
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
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
