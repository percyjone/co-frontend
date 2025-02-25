import React, { useRef} from "react";
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
import { useEffect, useState } from 'react';
import {createStudentsQuestionsMark} from "../apiHelpers/apiHelpers";
import CircularProgress from '@mui/material/CircularProgress';

import { useReactToPrint } from "react-to-print";


const  ReportTable = ({ questions, studentsQuestionsData }) => {
      
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
        studentsQuestionsData.map(student => ({
          ...student,
          answers: student.answers.map(answer => ({
            ...answer,
            isEditable: false,
          })),
        }))
      );

      const tableRef = useRef();

      const handlePrint = useReactToPrint({
        content: () => tableRef.current, // Selects only the table for printing
      });

      useEffect(() => {
        console.log("Table Ref: ", tableRef.current);
      }, []);

    function getStudentCoMarks(answersData) {
      const CoMarks = new Map();

      try {
        for (const answerData of answersData) {
          CoMarks.set(
            answerData.questionCo,
            CoMarks.has(answerData.questionCo)
              ? CoMarks.get(answerData.questionCo) + answerData.acquiredMark
              : answerData.acquiredMark
          )
        }

        // Sort the Map by key
        const sortedCoMarks = new Map(
          [...CoMarks.entries()].sort((a, b) => a[0] - b[0])
        );

        // Return the Map values as an array
        return Array.from(sortedCoMarks.values());
      } catch (error) {
        console.error(error);
        return [];
      }
    }
      
    
  return (
    <div>
    <div ref={tableRef}>
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
              left: 0,
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
              Q{index + 1} <br />
            </TableCell>
          ))}
          {Array.from({ length: 3 }).map((_, index) => (
            <TableCell
              key={index}
              style={{
                backgroundColor: '#F8F9FA',
                position: 'sticky',
                top: 0  ,
                zIndex: 1,
              }}
              align="center"
            >
              CO {index + 1}
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
                  key: index,
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
                key={index}
                style={{
                  backgroundColor: '#F8F9FA',
                  position: 'sticky',
                  top: 36,
                  zIndex: 1,
                }}
              />
            )
          )}
          {Array.from({ length: 3 }).map((_, index) => (
            <TableCell
              key={index}
              style={{
                backgroundColor: '#F8F9FA',
                position: 'sticky',
                top: 0  ,
                zIndex: 1,
              }}
              align="center"
            >
            </TableCell>
          ))}
        </TableRow>

        {/* Subdivision row */}
        <TableRow>
          <TableCell
            style={{
              backgroundColor: '#F8F9FA',
              position: 'sticky',
              top: 72, 
              left: 0, 
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
                <br/>
                <span style={{ fontSize: '0.8em' }}>
                  {questions[index].marks}m
                  {' '}CO{questions[index].coName}
                </span>
              </TableCell>
            ) : (
              <TableCell
                key={index}
                style={{
                  backgroundColor: '#F8F9FA',
                  position: 'sticky',
                  top: 72,
                  zIndex: 1,
                }}
              >
              <br/>
                <span style={{ fontSize: '0.8em' }}>
                  {questions[index].marks}m
                  {' '}CO{questions[index].coName}
                </span>
              </TableCell>
            )
          )}
          {Array.from({ length: 3 }).map((_, index) => (
            <TableCell
              key={index}
              style={{
                backgroundColor: '#F8F9FA',
                position: 'sticky',
                top: 0  ,
                zIndex: 1,
              }}
              align="center"
            >
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {studentsData.map((student, studentIndex) => (
          <TableRow key={studentIndex}>
            {/* Sticky Student Name column */}
            <TableCell
              style={{
                position: 'sticky',
                left: 0,
                backgroundColor: '#f9fcfc',
                zIndex: 1,
              }}
            >
              {student.name}
            </TableCell>
            {student.answers.map((answer, questionIndex) => (
              <TableCell
                key={questionIndex}
                contentEditable={false}
                onBlur={(e) => {
                  const enteredValue = parseInt(e.target.innerText, 10);
                  if (enteredValue > answer.totalMark) {
                    e.target.innerText = answer.totalMark;
                  }
                  handleChange(studentIndex, questionIndex, e.target.innerText);
                }}
                suppressContentEditableWarning={true}
                style={{
                  backgroundColor: answer.isEditable ? '#FFFFFF' : '#ededed',
                  cursor: answer.isEditable ? 'text' : 'not-allowed',
                }}
              >
                {answer.acquiredMark}
              </TableCell>
            ))}
            {/* {(getStudentCoMarks(student.answers)).map((CoMark, index) => (
              <TableCell
                key={index}
                contentEditable={false}
                suppressContentEditableWarning={true}
                style={{
                  backgroundColor: '#ededed',
                  cursor: 'not-allowed',
                }}
              > 
                {CoMark}
              </TableCell>
            ))} */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Paper>
</div>
  <Button onClick={handlePrint}>Print</Button>

    </div>
  )
}

export default ReportTable
