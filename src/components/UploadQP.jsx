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
    width="50%"
    maxWidth="400px"
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
          <Typography variant="h6" color="success">
            <Button variant="contained" color="success" onClick={() => navigate('/studentMarkEntry')} >
                Go to Mark entry Page
            </Button>
          </Typography>
        </div>
      )}
    </Box>
  );
};

export default UploadQP;
