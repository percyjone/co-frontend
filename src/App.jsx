import React, { useState,useEffect } from "react";
import "./App.css";
import UploadQuestionPaper from "./pages/UploadQuestionPaper.jsx";
import QuestionMarkEntryTable from "./components/QuestionMarkEntryTable.jsx";
import { questions } from "./markEntryTableInput.js";

const App = () => {
  return (
    <div className="App">
      <h1>Student Mark Visualization</h1>
      <QuestionMarkEntryTable questions={questions}/>
    </div>
  );
};

export default App;
