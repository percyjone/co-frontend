import React, { useState,useEffect } from "react";
import "./App.css";
import Table from "./components/QuestionMapTable.jsx";
import MarkEntryTable from "./components/MarkEntryTable.jsx";
import Auth from "./components/auth.jsx";   

const App = () => {
  return (
    <div className="App">
      <h1>Table</h1>
      <Auth />
      
    </div>
  );
};

export default App;
