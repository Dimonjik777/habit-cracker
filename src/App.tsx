import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ModalWindow from "./components/ModalWindow";
import FormRegister from "./components/FormRegister";
function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={<ModalWindow>
            <FormRegister />
          </ModalWindow>} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
