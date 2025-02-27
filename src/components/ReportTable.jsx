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
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider
} from "@mui/material";
import { useEffect, useState } from 'react';
import {createStudentsQuestionsMark} from "../apiHelpers/apiHelpers";
import CircularProgress from '@mui/material/CircularProgress';
import { useReactToPrint } from "react-to-print";


const  ReportTable = ({ questions, studentsQuestionsData, selectionData }) => {
      
      const maxQuestionNumber = Math.max(...questions.map(q => parseInt(q.no, 10)));
    
      const questionOccurences = Array(maxQuestionNumber + 1).fill(0);
      const uniqueCOs = Array.from(new Set(questions.map(q => q.coId))).map(
        coId => {
          const q = questions.find(q => q.coId === coId);
          return { coId: coId, coName: q.coName };
        }
      );

      console.log(uniqueCOs)
    
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


      const printRef = useRef(); // Reference to the div to be printed

      const handlePrint = () => {
        window.print();
      };

  return (
    <div>
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
                width: 100% !important;
                max-width: 100% !important;
                overflow: visible !important;
              }
            }
        `}
      </style>
    <div id="printTable">
    <Card
      sx={{
        maxWidth: 600,
        mx: "auto",
        my: 3,
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "#F8F9FA",
      }}
    >
      <CardContent>
        {/* College Name */}
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: "bold", color: "#1976D2" }}
        >
          PSNA College of Engineering and Technology
        </Typography>

        {/* Department Name */}
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: "bold", color: "#555", mt: 1 }}
        >
          Department of COMPUTER SCIENCE ENGINEERING
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Subject Name & Code */}
        <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Subject:{" "}
            <span style={{ fontWeight: "normal" }}>
              {selectionData.subjectName && selectionData.subject
                ? `${selectionData.subjectName.toUpperCase()} (${selectionData.subject.toUpperCase()})`
                : "N/A"}
            </span>
        </Typography>


        <Divider sx={{ my: 2 }} />

        {/* Exam, Year, and Semester */}
        <Grid container spacing={2} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Exam:{" "}
              <span style={{ fontWeight: "normal" }}>
                {selectionData.examName || "N/A"}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Semester:{" "}
              <span style={{ fontWeight: "normal" }}>
                {selectionData.semester || "N/A"}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Year:{" "}
              <span style={{ fontWeight: "normal" }}>
                {selectionData.examYear || "N/A"}
              </span>
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Year, Department, Section */}
        <Grid container spacing={2} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Year:{" "}
              <span style={{ fontWeight: "normal" }}>
                {selectionData.year || "N/A"}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Department:{" "}
              <span style={{ fontWeight: "normal" }}>
                {selectionData.dept || "N/A"}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Section:{" "}
              <span style={{ fontWeight: "normal" }}>
                {selectionData.sec || "N/A"}
              </span>
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Faculty Name */}
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", mt: 2 }}
        >
          Faculty:{" "}
          <span style={{ fontWeight: "normal" }}>
            {selectionData.faculty || "N/A"}
          </span>
        </Typography>
      </CardContent>
    </Card>



      <Paper sx={{ width: '100%' }}>
   <TableContainer  sx={{
    maxHeight: "100vh",
    overflowX: "visible",
  }}>
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
          {uniqueCOs.map((co, index) => (
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
             CO {co.coName}
            </TableCell>
          ))}
          <TableCell
              style={{
                backgroundColor: '#F8F9FA',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
              align="center"
            >
             Total
            </TableCell>
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
          {uniqueCOs.map((co, index) => (
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
            </TableCell>
          ))}
          <TableCell
              style={{
                backgroundColor: '#F8F9FA',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
              align="center"
            >
            </TableCell>
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
          {uniqueCOs.map((co, index) => (
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
            {studentsData[0]?.coMarks.find((coMark) => coMark.coId === co.coId)?.coTotal || 'N/A'}
          </TableCell>
          ))}
          <TableCell
              style={{
                backgroundColor: '#F8F9FA',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
              align="center"
            >
            {studentsData.length > 0
    ? studentsData[0]?.coMarks.reduce((sum, mark) => sum + mark.coTotal, 0)
    : 0}
            </TableCell>
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
            {
              uniqueCOs.map((uniqueCo) => (
                <TableCell key={uniqueCo}>{student.coMarks.find((coMark) => coMark.coId === uniqueCo.coId)?.mark || 0}</TableCell>
              ))
            }
            <TableCell>
            {student.coMarks.reduce((sum, coMark) => sum + coMark.mark, 0)}
            </TableCell>
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
