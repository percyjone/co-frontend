import React, { useState,useEffect } from "react";
import "./App.css";
import Table from "./components/QuestionMapTable.jsx";
import MarkEntryTable from "./components/MarkEntryTable.jsx";
const App = () => {
  return (
    <div className="App">
      <h1>Table</h1>
      <MarkEntryTable />
    </div>
  );
};

export default App;
