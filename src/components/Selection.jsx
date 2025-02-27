// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { getAllSubjects } from '../apiHelpers/apiHelpers';
import axios from 'axios';

const SelectionComponent = ({ context, onSubmit }) => {
  const [formData, setFormData] = useState({
    year: '',
    sec: '',
    subject: '',
    examName: '',
    semester: '',
    examYear: '',
    dept: '',
    faculty:'',
    subjectName:''
  });

  const [options, setOptions] = useState({
    year: ['I','II','III','IV'],
    sec: ['A', 'B', 'C', 'D'],
    subject: [],
    examName: {
      "Serial Test": ["SerialTest1", "SerialTest2", "SerialTest3"],
      Assignment: ["Assignment1", "Assignment2"],
      Semester: ["oddSem", "evenSem"],
      Quiz: ["Quiz1", "Quiz2"],
      CaseStudy: ["CaseStudy1", "CaseStudy2"]
    },
    semester: [1,2,3,4,5,6,7,8],
    examYear: ['2024', '2025'],
    dept: ['CSE', 'IT', 'ECE', 'EEE'],
    faculty:['Dr.N.Dhanalakshmi','Ms.L.Dharshana Deepthi']
  });

  const [examType, setExamType] = useState("Serial Test");

  useEffect(() => {
    getAllSubjects() // Fetch data from the API
      .then((response) => {
        const subjectOptions = response.map((subject) => ({
          name: subject.name,
          code: subject.code 
        })); 
        setOptions((prevOptions) => ({
          ...prevOptions,
          subject: subjectOptions, // Set the subject options
        }));
      })
      .catch((error) => {
        console.error('Error fetching form options:', error);
      });
  }, []);
  
  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    if (name === "subject") {
      const selectedSubject = options.subject.find((subject) => subject.code === value);
      setFormData({
        ...formData,
        subject: selectedSubject ? selectedSubject.code : "",
        subjectName: selectedSubject ? selectedSubject.name : ""
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    if (onSubmit) {
      console.log("Data seleceted:",formData)
      onSubmit(formData);
    }
    setFormData({ year: '', sec: '', subject: '', examName: '', semester: '', examYear: '' }); // Reset form
  };

  const handleExamTypeChange = (e) => {
    setExamType(e.target.value);
  };

  const fields = {
    markEntryPage: [
      { label: 'Year', name: 'year' },
      { label: 'Section', name: 'sec' },
      { label: 'Dept', name: 'dept'},
      {label:'Faculty',name:'faculty'}
    ],
    questionPaperEntry: (examType) => {
      let examLabel = "Exam Name";
      let yearLabel = "Exam Year";
  
      if (examType === "Serial Test") {
        examLabel = "Serial Test Name";
        yearLabel = "Serial Test Year";
      } 
      else if (examType === "Assignment") {
        examLabel = "Assignment Title";
        yearLabel = "Assignment Year";
      } else if (examType === "Semester") {
        examLabel = "Semester Exam Name";
        yearLabel = "Semester Year";
      }
       else if (examType === "Quiz") {
        examLabel = "Quiz Name";
        yearLabel = "Quiz Year";
      } else if (examType === "CaseStudy") {
        examLabel = "Case Study Name";
        yearLabel = "Case Study Year";
      }
  
      return [
        { label: "Subject", name: "subject" },
        { label: examLabel, name: "examName" },
        { label: yearLabel, name: "examYear" },
        { label: "Semester", name: "semester" }
      ];
    }  
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0,
          maxWidth: '600px',
          margin: 'auto'
        }}
      >
       {context === "questionPaperEntry" && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Exam Type</InputLabel>
          <Select value={examType} onChange={handleExamTypeChange} label="Exam Type">
            <MenuItem value="Serial Test">Serial Test</MenuItem>
            <MenuItem value="Assignment">Assignment</MenuItem>
            <MenuItem value="Semester">Semester</MenuItem>
            <MenuItem value="Quiz">Quiz</MenuItem>
            <MenuItem value="CaseStudy">Case Study</MenuItem>
          </Select>
        </FormControl>
      )}

      {(typeof fields[context] === "function" ? fields[context](examType) : fields[context]).map(
        (field) => (
          <TextField
            key={field.name}
            select
            label={field.label}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
          >
            {(field.name === "examName" ? options.examName[examType] : options[field.name])?.map(
              (option, index) => (
                <MenuItem
                  key={index}
                  value={field.name === "subject" ? option.code : option}
                >
                  {field.name === "subject" ? `${option.name} - ${option.code}` : option}
                </MenuItem>
              )
            )}
          </TextField>
        )
      )}

      </Box>
      <Box textAlign="center" mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default SelectionComponent;

