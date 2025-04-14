import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={<div>Home page</div>} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
