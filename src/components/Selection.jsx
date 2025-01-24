// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { getAllSubjects } from '../apiHelpers/apiHelpers';
import axios from 'axios';

const SelectionComponent = ({ context, onSubmit }) => {
  const [formData, setFormData] = useState({
    year: '',
    sec: '',
    subject: '',
    examName: '',
    semester: '',
    examYear: ''
  });

  const [options, setOptions] = useState({
    year: [1,2,3,4],
    sec: ['A', 'B', 'C', 'D'],
    subject: [],
    examName: ['SerialTest1', 'SerialTest2', 'SerialTest3', 'oddSem', 'evenSem'],
    semester: [1,2,3,4,5,6,7,8],
    examYear: ['2024', '2025']
  });

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      console.log("Data seleceted:",formData)
      onSubmit(formData);
    }
    setFormData({ year: '', sec: '', subject: '', examName: '', semester: '', examYear: '' }); // Reset form
  };

  const fields = {
    markEntryPage: [
      { label: 'Year', name: 'year' },
      { label: 'Section', name: 'sec' },
    ],
    questionPaperEntry: [
      { label: 'Subject', name: 'subject' },
      { label: 'Exam Name', name: 'examName' },
      { label: 'Exam Year', name: 'examYear' },
      { label: 'Semester', name: 'semester' }
    ]
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          maxWidth: '600px',
          margin: 'auto'
        }}
      >
        {fields[context].map((field) => (
          <TextField
            key={field.name}
            select
            label={field.label}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
          >
            {options[field.name].map((option, index) => (
              <MenuItem
                key={index}
                value={field.name === 'subject' ? option.code : option}
              >
                {field.name === 'subject' ? `${option.name} - ${option.code}` : option}
              </MenuItem>
            ))}
          </TextField>
        ))}
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
