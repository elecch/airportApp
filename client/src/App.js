import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home";
import Record from "./pages/Record";
import Static from "./pages/Static";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/records" element={<Record />} />
            <Route path="/statistics" element={<Static />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
