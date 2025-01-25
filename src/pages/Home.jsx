import React from "react"
import { Button, Box } from '@mui/material';
const Home = () => {

    return (
        <Box
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        height="100vh" 
        gap={2} 
      >
        <Button variant="contained" >
          Upload QuestionPaper
        </Button>
        <Button variant="contained">
          Student mark entry
        </Button>
      </Box>
    );

    }
export default Home