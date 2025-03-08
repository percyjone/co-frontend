import React from 'react';
import { Box,Typography} from '@mui/material';
import psnaLogo from "../assets/psnalogo.png";
function Header() {
  return (
  <Box>
      <Box
       sx={
        {ml:{lg:40,xs:13,sm:40,md:60},
         mt:{lg:0,xs:1,sm:10}}
      
      
      }
      >
       <img src={psnaLogo} alt="PSNA Logo" width={100} height={100} />  
       </Box>
    <Box
    textAlign='center'
    justifyContent='center'
    sx={
      {mt:{lg:-15},
      
      
      ml:{lg:9}}
     }>
      <Typography
    color='#1976D2'
      >
      <h1>PSNA College Of Engineering And Technology</h1>
      </Typography>
      <Typography 
   color='#555555'>
      <h3>Department of Computer Science Engineering</h3>
      </Typography>
      </Box>
   
   </Box>
  );
}

export default Header;
