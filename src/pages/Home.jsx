import React from "react"
import { Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ReportPage from "./ReportPage";

const Home = () => {

  const navigate = useNavigate();
  const handleUpload = () => {
    navigate('/upload');
  }

  const handleStudentMarkEntry = () => {
    navigate('/studentMarkEntry');
  }



    return (
        <Box
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        height="50vh" 
        gap={2} 
      >
        <Button onClick={handleUpload}  variant="contained" >
          Upload QuestionPaper
        </Button>
        <Button onClick={handleStudentMarkEntry} variant="contained">
          Student mark entry
        </Button>
        <Button onClick={() => navigate('/report')} variant="contained">
          Generate Report
        </Button>
      </Box>
    );

    }
export default Home