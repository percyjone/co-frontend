import React, { useState,useEffect } from "react";
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
    <div className="App">
      <h1>Student Mark Visualization</h1>
      {/* <QuestionMarkEntryTable questions={questions}/>
      <Auth/> */}
      
      {/* <Home/> */}
      <UploadQP/>
      {/* <UploadQuestionPaper/> */}
    </div>
  );
};

export default App;
