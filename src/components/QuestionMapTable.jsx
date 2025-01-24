import React, { useState,useEffect } from "react";
import sampleInput from "../sampleInput.js";
import "./QuestionMapTable.css";

const QuestionMapTable = ({questions=[],correctedQuestions,canSave}) => {
  //  console.log("data from table:",data);
    const [rowCount,setRowCount] = useState(0);
    const [rows, setRows] = useState([]);
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(canSave);


      useEffect(() => {
        const initializedRows = questions.map((row, index) => ({
          ...row,
          isEditable: false,
          id: index + 1, // Use the index to generate unique IDs
        })
      );
        setRows(initializedRows);
        setRowCount(questions.length + 1); // Set the ID to the next available number
      }, []);
      
    
      // Toggle table-wide edit mode
      const toggleEditMode = () => {
        setIsEditingMode((prev) => !prev);
      };
    
      // Toggle individual row edit mode
      const toggleRowEditMode = (id) => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, isEditable: !row.isEditable } : row
          )
        );
      };
    
      // Handle cell value change
      const handleInputChange = (id, field, value) => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, [field]: value } : row
          )
        );
      };
    
      // Add a new row
      const handleAddRow = () => {
        const newRow = {
          id:  rowCount,
          qno: "Enter Qno",
          option: "Enter Option",
          subdivision: "Enter Subdivision",
          question: "New Question",
          marks: "Enter Marks",
          co: "Enter CO",
          pi: "Enter PI",
          isEditable: false,
        };
        setRows([...rows, newRow]);
        setRowCount(rowCount+1);
      };
    
      // Delete a row
      const handleDeleteRow = (id) => {
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
      };
    
      // Save the table data 
      const handleSave = () => {
        setShowSaveButton(false);
        // Save the data to the backend
        if (correctedQuestions) {
          correctedQuestions(rows); // Sends data to the parent component
        }
        console.log("Saved data:", rows);
        setIsEditingMode(false);
      };
    
      return (
        <div className="container">        
          <h1>Map Questions</h1>
    
          {/* Form Section */}
          <div className="form">
            <div className="form-group">
              <label htmlFor="select-co">Subject:</label>
            </div>
            <div className="form-group">
              <label htmlFor="select-co">Exam:</label>
            </div>

          </div>
    
          {/* Table Section */}
          {rows.length > 0 ? (
            <div>
          <table>
            <thead>
              <tr>
                <th>QNO</th>
                <th>Option</th>
                <th>Subdivision</th>
                <th>Question</th>
                <th>Marks</th>
                <th>CO</th>
                <th>PI</th>
                {isEditingMode && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    {row.isEditable ? (
                      <input
                        type="text"
                        value={row.no}
                        onChange={(e) =>
                          handleInputChange(row.id, "qno", e.target.value)
                        }
                      />
                    ) : (
                      row.no
                    )}
                  </td>
                  <td>
                    {row.isEditable ? (
                      <input
                        type="text"
                        value={row.option}
                        onChange={(e) =>
                          handleInputChange(row.id, "option", e.target.value)
                        }
                      />
                    ) : (
                      row.option
                    )}
                  </td>
                  <td>
                    {row.isEditable ? (
                      <input
                        type="text"
                        value={row.subDivision}
                        onChange={(e) =>
                          handleInputChange(row.id, "subDivision", e.target.value)
                        }
                      />
                    ) : (
                      row.subDivision
                    )}
                  </td>
                  <td>
                    {row.isEditable ? (
                      <input
                        type="text"
                        value={row.question}
                        onChange={(e) =>
                          handleInputChange(row.id, "question", e.target.value)
                        }
                      />
                    ) : (
                      row.question
                    )}
                  </td>
                  <td>
                    {row.isEditable ? (
                      <input
                        type="number"
                        value={row.marks}
                        onChange={(e) =>
                          handleInputChange(row.id, "marks", e.target.value)
                        }
                      />
                    ) : (
                      row.marks
                    )}
                  </td>
                  <td>
                    {row.isEditable ? (
                      <input
                        type="text"
                        value={row.co}
                        onChange={(e) =>
                          handleInputChange(row.id, "co", e.target.value)
                        }
                      />
                    ) : (
                      row.co
                    )}
                  </td>
                  <td>
                    {row.isEditable ? (
                      <input
                        type="text"
                        value={row.pi}
                        onChange={(e) =>
                          handleInputChange(row.id, "pi", e.target.value)
                        }
                      />
                    ) : (
                      row.pi
                    )}
                  </td>
                  {isEditingMode && (
                    <td className="action-column">
                      <button
                        className="delete-icon"
                        onClick={() => handleDeleteRow(row.id)}
                      >
                        🗑️
                      </button>
                      <button
                        className="edit-icon"
                        onClick={() =>
                          row.isEditable
                            ? toggleRowEditMode(row.id) // Save changes
                            : toggleRowEditMode(row.id) // Switch to edit mode
                        }
                      >
                        {row.isEditable ? "💾" : "✏️"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Edit Button Section */}
          {showSaveButton && (
              <div className="edit-controls">
              {!isEditingMode && (
                <button className="edit-button" onClick={toggleEditMode}>
                  Edit
                </button>
              )}
                <button className="edit-button" onClick={handleSave} >
                  Save
                </button>
                {/* Add Row Button, Always Visible Outside the Table */}
                {isEditingMode && (
                  <button className="add-icon" onClick={handleAddRow}>
                    ➕
                  </button>
                )}
              </div>
           )}


          </div>) : 
          (
            <div>
            <p>No data available.</p>
            <button>Upload question paper</button>
            </div>
            )}
        
        </div>
      );
};

export default QuestionMapTable;