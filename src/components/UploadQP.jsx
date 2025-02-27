import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { uploadQuestionPaper,createQuestions } from '../apiHelpers/apiHelpers';
import QuestionMapTable from './QuestionMapTable';
import { useNavigate } from "react-router-dom";

const UploadQP = ({subjectCode,examName,examYear,semester}) => {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [correctedQuestions, setCorrectedQuestions] = useState([]);
  const [questionCreationStatus, setQuestionCreationStatus] = useState('');
  const [maxMarks, setMaxMarks] = useState('');
  const [coMarks, setCoMarks] = useState({
    CO1: null,
    CO2: null,
    CO3: null,
    CO4: null,
    CO5: null
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setFile(selectedFile);
      setUploadStatus('');
    } else {
      setUploadStatus('Please upload a valid .docx file.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('Uploading...');
      const response =await uploadQuestionPaper(formData);
      setUploadStatus(`Upload successful`);
      setParsedQuestions(response.questions);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  const pushQuestions =  (data) => {
    setCorrectedQuestions(data);
    console.log("from parent component",data)
    }

  useEffect(() => {
    if (correctedQuestions.length > 0) {
      console.log('send questions to server');
      const exam = {name:examName,year:parseInt(examYear),semester:parseInt(semester)};

      createQuestions(subjectCode,correctedQuestions,exam)
        .then((response) => {
          setQuestionCreationStatus('Questions uploaded successfully');
          console.log('questions uploaded successfully', response);
        })
        .catch((error) => {
          console.error('Error uploading questions:', error);
        });
    }
  }, [correctedQuestions]);

  const handleCoMarksChange = (co, value) => {
    const newValue = value === '' ? 0 : Number(value);
    
    // Calculate sum of all other CO marks (excluding current CO)
    const otherCOsSum = Object.entries(coMarks)
      .filter(([key]) => key !== co)
      .reduce((sum, [_, val]) => sum + Number(val), 0);
    
    // Check if new total would exceed max marks
    if (otherCOsSum + newValue > Number(maxMarks)) {
      alert(`Total CO marks cannot exceed maximum marks (${maxMarks})`);
      return;
    }

    setCoMarks(prev => ({
      ...prev,
      [co]: newValue
    }));
  };

  const handleMaxMarksChange = (value) => {
    const newMaxMarks = value === '' ? 0 : Number(value);
    const totalCOMarks = Object.values(coMarks).reduce((sum, val) => sum + Number(val), 0);
    
    if (totalCOMarks > newMaxMarks) {
      alert('Maximum marks cannot be less than total CO marks');
      return;
    }
    
    setMaxMarks(value);
  };

  const handleSubmitAssessment = async () => {
    // Validate total CO marks equals maximum marks
    const totalCOMarks = Object.values(coMarks).reduce((sum, val) => sum + Number(val), 0);
    
    if (totalCOMarks !== Number(maxMarks)) {
      alert(`Total CO marks (${totalCOMarks}) must equal maximum marks (${maxMarks})`);
      return;
    }

    const assessmentData = {
      subjectCode,
      examName,
      examYear: parseInt(examYear),
      semester: parseInt(semester),
      maxMarks: Number(maxMarks),
      coMarks
    };

    try {
      console.log('Assessment data:', assessmentData);
      // navigate('/studentMarkEntry');
    } catch (error) {
      console.error('Error saving assessment data:', error);
    }
  };

  if (examName.includes('Quiz') || examName.includes('CaseStudy') || examName.includes('MiniProject')) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start" // Changed to flex-start for better alignment
          gap={2}
          p={3}
          border="1px solid #ccc"
          borderRadius="8px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          width="100%"
          maxWidth="500px"
        >
          <Typography variant="h5">{examName} Settings</Typography>
          <Box width="100%">
            <Typography>Maximum Marks</Typography>
            <input
              type="number"
              min="0"
              value={maxMarks}
              onChange={(e) => handleMaxMarksChange(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
          </Box>
          
          {Object.keys(coMarks).map((co) => (
            <Box key={co} width="100%">
              <Typography>Marks for {co}</Typography>
              <input
                type="number"
                min="0"
                value={coMarks[co]}
                onChange={(e) => handleCoMarksChange(co, e.target.value)}
                style={{ width: '100%', padding: '8px' }}
              />
            </Box>
          ))}
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitAssessment}
            disabled={!maxMarks}
          >
            Save and Continue
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
    <Box display="flex"
    flexDirection="column"
    alignItems="center"
    gap={2}
    p={3}
    border="1px solid #ccc"
    borderRadius="8px"
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
    width="100%"
    maxWidth="500px"
  >
      <Typography variant="h5">Upload a .docx File</Typography>
      <input
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="docx-upload"
      />
      <label htmlFor="docx-upload">
        <Button variant="contained" component="span">
          Choose File
        </Button>
      </label>
      {file && <Typography>{file.name}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file}
      >
        Upload
      </Button>
      </Box>
      {uploadStatus && <Typography color="error">{uploadStatus}</Typography>}
      {uploadStatus.includes('Upload successful') && (
          <QuestionMapTable questions={parsedQuestions} correctedQuestions={pushQuestions} canSave={true}/>
      )}
      {questionCreationStatus === 'Questions uploaded successfully' && (
        <div>
        <Button
          variant="contained" onClick={() => navigate('/studentMarkEntry')}
        >
          Go to Mark entry Page
        </Button>
        </div>
      )}
    </Box>
  );
};

export default UploadQP;
