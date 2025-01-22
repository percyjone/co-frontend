import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useState } from 'react';
import { questions, students } from "../markEntryTableInput.js";

const NestedMarkEntryTable = () => {
  
  const maxQuestionNumber = Math.max(...questions.map(q => parseInt(q.no, 10)));

  const questionOccurences = Array(maxQuestionNumber + 1).fill(0);

  questions.forEach(({ no }) => {
    const questionNo = parseInt(no, 10);
    questionOccurences[questionNo] = (questionOccurences[questionNo] || 0) + 1;
  });

  const slicedQuestionOccurences = questionOccurences.slice(1);

  const allOptions = questions.reduce((acc, { option }) => {
    acc.push(option || 1);
    return acc;
  }, []);

  const allSubdivisions = questions.reduce((acc, { subDivision }) => {
    acc.push(subDivision || 1);
    return acc;
  }, []);

  const [studentsData, setStudentsData] = useState(
    students.map(student => ({
      id: student.id,
      name: student.name,
      answers: questions.map((question, index) => ({
        questionID: question.id,
        questionNo: (question.no+question.option).trim(),   
        isEditable: true,       
        acquiredMark: ""           
      }))
    }))
  );

  const handleChange = (studentIndex, questionIndex, newValue) => {
    setStudentsData((prevData) => {
      const updatedData = [...prevData];
  
      const currentAnswer = updatedData[studentIndex].answers[questionIndex];
      currentAnswer.acquiredMark = newValue;
  
      if (currentAnswer.questionNo.endsWith("A")) {
        const relatedQuestionNo = currentAnswer.questionNo.replace("A", "B");
  
        const relatedCells = updatedData[studentIndex].answers.filter(
          (answer) => answer.questionNo === relatedQuestionNo
        );
  
        if (relatedCells.length) {
          relatedCells.forEach(cell => cell.isEditable = !newValue.trim());
        }
      } else if (currentAnswer.questionNo.endsWith("B")) {
        const relatedQuestionNo = currentAnswer.questionNo.replace("B", "A");
  
        const relatedCells = updatedData[studentIndex].answers.filter(
          (answer) => answer.questionNo === relatedQuestionNo
        );
  
        if (relatedCells.length) {
          relatedCells.forEach(cell => cell.isEditable = !newValue.trim());
        }
      }
  
      return updatedData;
    });
  };
  
  

  const handleSubmit = () =>{
    console.log(studentsData);
  }

  return (
    <>
   <Paper sx={{ width: '100%' }}>
  <TableContainer sx={{ maxHeight: '100vh', overflowX: 'auto' }}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        {/* Question number row */}
        <TableRow>
          <TableCell
            style={{
              backgroundColor: '#F8F9FA',
              position: 'sticky',
              top: 0,
              left: 0, // Sticky left for the first column
              zIndex: 2,
              padding: 0,
            }}
            align="center"
            key={1}
          >
            Student Name
          </TableCell>
          {slicedQuestionOccurences.map((count, index) => (
            <TableCell
              style={{
                backgroundColor: '#F8F9FA',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
              align="center"
              key={index}
              colSpan={count}
            >
              Q{index + 1}
            </TableCell>
          ))}
        </TableRow>

        {/* Option row */}
        <TableRow>
          <TableCell
            style={{
              backgroundColor: '#F8F9FA',
              position: 'sticky',
              top: 36, // Adjust top for multi-row headers
              left: 0, // Sticky left for the first column
              zIndex: 2,
            }}
          />
          {allOptions.map((value, index) =>
            typeof value === 'string' ? (
              <TableCell
                style={{
                  backgroundColor: '#F8F9FA',
                  position: 'sticky',
                  top: 36,
                  zIndex: 1,
                }}
                align="center"
                key={index}
                colSpan={1}
              >
                {value}
              </TableCell>
            ) : (
              <TableCell
                style={{
                  backgroundColor: '#F8F9FA',
                  position: 'sticky',
                  top: 36,
                  zIndex: 1,
                }}
              />
            )
          )}
        </TableRow>

        {/* Subdivision row */}
        <TableRow>
          <TableCell
            style={{
              backgroundColor: '#F8F9FA',
              position: 'sticky',
              top: 72, // Adjust top for multi-row headers
              left: 0, // Sticky left for the first column
              zIndex: 2,
            }}
          />
          {allSubdivisions.map((subDivision, index) =>
            typeof subDivision === 'string' ? (
              <TableCell
                style={{
                  backgroundColor: '#F8F9FA',
                  position: 'sticky',
                  top: 72,
                  zIndex: 1,
                  padding: '6px'
                }}
                align="center"
                key={index}
                colSpan={1}
              >
                {'i'.repeat(subDivision)}
              </TableCell>
            ) : (
              <TableCell
                style={{
                  backgroundColor: '#F8F9FA',
                  position: 'sticky',
                  top: 72,
                  zIndex: 1,
                }}
              />
            )
          )}
        </TableRow>
      </TableHead>

      <TableBody>
        {studentsData.map((student, studentIndex) => (
          <TableRow key={studentIndex}>
            {/* Sticky Student Name column */}
            <TableCell
              style={{
                position: 'sticky',
                left: 0, // Sticky left
                backgroundColor: '#fff', // Match row background color
                zIndex: 1,
              }}
            >
              {student.name}
            </TableCell>
            {student.answers.map((answer, questionIndex) => (
              <TableCell
                key={questionIndex}
                onInput={(e) => {
                  e.target.innerText = e.target.innerText.replace(/[^0-9]/g, ''); // Only numeric input
                }}
                contentEditable={answer.isEditable}
                onBlur={(e) =>
                  handleChange(studentIndex, questionIndex, e.target.innerText)
                }
                suppressContentEditableWarning={true}
                style={{
                  backgroundColor: answer.isEditable ? 'white' : '#f0f0f0',
                  cursor: answer.isEditable ? 'text' : 'not-allowed',
                }}
              >
                {answer.acquiredMark}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Button onClick={handleSubmit}>Submit</Button>
</Paper>

    </>
  );
};

export default NestedMarkEntryTable;
