import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={<div>Home page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
