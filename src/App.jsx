import React, { useState,useEffect } from "react";
import "./App.css";
import UploadQuestionPaper from "./pages/UploadQuestionPaper.jsx";

const App = () => {
  return (
    <div className="App">
      <h1>Student Mark Visualization</h1>
      <UploadQuestionPaper/>
    </div>
  );
};

export default App;
