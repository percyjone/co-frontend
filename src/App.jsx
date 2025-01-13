import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [rows, setRows] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      qno: `Q${index + 1}`,
      option: "Option",
      subdivision: "Subdivision",
      question: "Sample Question",
      marks: 10,
      co: "CO1",
      pi: "PI1",
      isEditable: false, // To toggle individual row editing
    }))
  );

  const [isEditingMode, setIsEditingMode] = useState(false);

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
      id: rows.length + 1,
      qno: `Q${rows.length + 1}`,
      option: "New Option",
      subdivision: "New Subdivision",
      question: "New Question",
      marks: 0,
      co: "CO1",
      pi: "PI1",
      isEditable: false,
    };
    setRows([...rows, newRow]);
  };

  // Delete a row
  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  return (
    <div className="container">
      <h1>Student COS and Subject Entry</h1>

      {/* Form Section */}
      <div className="form">
        <div className="form-group">
          <label htmlFor="select-co">Enter Qn/CO</label>
          <select id="select-co">
            <option value="">Select CO</option>
            <option value="CO1">Select Question</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="select-subject">Select Subject</label>
          <select id="select-subject">
            <option value="">Select Subject</option>
          </select>
        </div>
        <button className="submit-button">Submit</button>
      </div>

      {/* Table Section */}
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
                    value={row.qno}
                    onChange={(e) =>
                      handleInputChange(row.id, "qno", e.target.value)
                    }
                  />
                ) : (
                  row.qno
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
                    value={row.subdivision}
                    onChange={(e) =>
                      handleInputChange(row.id, "subdivision", e.target.value)
                    }
                  />
                ) : (
                  row.subdivision
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
      <div className="edit-controls">
        <button className="edit-button" onClick={toggleEditMode}>
          {isEditingMode ? "Save All" : "Edit"}
        </button>
        {/* Add Row Button, Always Visible Outside the Table */}
        {isEditingMode && (
          <button className="add-icon" onClick={handleAddRow}>
            ➕
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
