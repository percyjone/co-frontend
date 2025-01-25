import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UploadQuestionPaper from "./pages/UploadQuestionPaper.jsx";
import StudentMarkEntry from "./pages/StudentMarkEntry.jsx";

const App = () => {
  return (
    <Router>
    <div className="App">
      <h1>Student Mark Visualization</h1>
      <a href="/upload">Upload a question paper</a>
      <a href="/studentMarkEntry">Student Mark Entry</a>
      <Routes>
        <Route path="/upload" element={<UploadQuestionPaper />} />
        <Route path="/studentMarkEntry" element={<StudentMarkEntry subject="" examName="" examYear="" semester=""/>} />
      </Routes>
    </div>
    </Router>
  );
};

export default App;
