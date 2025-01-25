import React, { useState,useEffect } from "react";
import "./App.css";
import UploadQuestionPaper from "./pages/UploadQuestionPaper.jsx";
import StudentMarkEntry from "./pages/StudentMarkEntry.jsx";
import QuestionMarkEntryTable from "./components/QuestionMarkEntryTable.jsx";
import { questions, students, studentQuestionData } from "./markEntryTableInput.js";

const App = () => {
  return (
    <div className="App">
      <h1>Student Mark Visualization</h1>
      {/* <QuestionMarkEntryTable questions={questions} students={students} studentsQuestionsData={studentQuestionData}/> */}
      <StudentMarkEntry subject="" examName="" examYear="" semester=""/>
    </div>
  );
};

export default App;
