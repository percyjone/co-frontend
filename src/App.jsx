import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UploadQuestionPaper from "./pages/UploadQuestionPaper.jsx";
import StudentMarkEntry from "./pages/StudentMarkEntry.jsx";

import QuestionMarkEntryTable from "./components/QuestionMarkEntryTable.jsx";
import { questions } from "./markEntryTableInput.js";
// import Auth from "./components/Auth.jsx";
import Home from "./pages/Home.jsx";
import UploadQP from "./components/UploadQP.jsx";
const App = () => {
  return (
    <Router>
    <div className="App">
      <h1>Student Mark Visualization</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadQuestionPaper />} />
        <Route path="/studentMarkEntry" element={<StudentMarkEntry subject="" examName="" examYear="" semester=""/>} />
      </Routes>
    </div>
    
    </Router>
  );
};

export default App;
