// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewAll from "./pages/ViewAll";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-all" element={<ViewAll />} />
      </Routes>
    </Router>
  );
}

export default App;
