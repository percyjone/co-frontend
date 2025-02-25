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
  Stack,
  Typography,
  Grid
} from "@mui/material";


const ReportTable = ({ year, sec, dept, examName, examYear, semester, subject, 
  questions, studentsQuestionsData }) => {
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
              .print-header::after {
              display: block;
              font-weight: bold;
              color: red;
              text-align: center;
              margin-top: 10px;
            }
          }
        `}
      </style>

      <div id="printTable">
      <Stack className="print-header" spacing={0.5} alignItems="center">
      <Typography variant="h6" fontWeight="bold">
        PSNA College Of Engineering And Technology
      </Typography>
      <Typography variant="subtitle1">
        Department of Computer Science Engineering
      </Typography>
      <Grid container  >
    <Grid item  sx={{  paddingX: 10, paddingLeft:70}}>
      <Typography variant="body1" style={{ fontWeight: "bold", textAlign: "left" }}>
        Subject Code: {subject}
      </Typography>
    </Grid>

    {/* Center-aligned Exam Details */}
    <Grid item sx={{  paddingRight:1}}> 
      <Typography variant="body1">{examName } {examYear}</Typography>
    </Grid>

    {/* Right-aligned Section Info */}
    <Grid item>
      <Typography variant="body1" style={{ fontWeight: "bold", textAlign: "right" }}>
        {year} {sec} {dept}
      </Typography>
    </Grid>
  </Grid>
      
    </Stack>
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: '100vh', overflowX: 'visible' }}>
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
