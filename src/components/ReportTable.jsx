import React, { useRef, useEffect, useState } from "react";
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

const ReportTable = ({ questions, studentsQuestionsData }) => {
  const maxQuestionNumber = Math.max(...questions.map(q => parseInt(q.no, 10)));
  const questionOccurences = Array(maxQuestionNumber + 1).fill(0);

  questions.forEach(({ no }) => {
    const questionNo = parseInt(no, 10);
    questionOccurences[questionNo] = (questionOccurences[questionNo] || 0) + 1;
  });

  const slicedQuestionOccurences = questionOccurences.slice(1);

  const allOptions = questions.map(q => q.option || 1);
  const allSubdivisions = questions.map(q => q.subDivision || 1);

  const [studentsData, setStudentsData] = useState(
    studentsQuestionsData.map(student => ({
      ...student,
      answers: student.answers.map(answer => ({
        ...answer,
        isEditable: false,
      })),
    }))
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Print-Specific Styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printTable, #printTable * {
              visibility: visible;
            }
            #printTable {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>

      <div id="printTable">
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{maxHeight: '100vh',overflowX: 'visible' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
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
                  >
                    Student Name
                  </TableCell>
                  {slicedQuestionOccurences.map((count, index) => (
                    <TableCell
                      key={index}
                      style={{
                        backgroundColor: '#F8F9FA',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                      }}
                      align="center"
                      colSpan={count}
                    >
                      Q{index + 1}
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 }).map((_, index) => (
                    <TableCell
                      key={index}
                      style={{
                        backgroundColor: '#F8F9FA',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                      }}
                      align="center"
                    >
                      CO {index + 1}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {studentsData.map((student, studentIndex) => (
                  <TableRow key={studentIndex}>
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
                        suppressContentEditableWarning={true}
                        style={{
                          backgroundColor: answer.isEditable ? '#FFFFFF' : '#ededed',
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
        </Paper>
      </div>

      <Button onClick={handlePrint}>Print</Button>
    </div>
  );
};

export default ReportTable;
