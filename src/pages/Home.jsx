import React from "react"
import { Button, Box, Card, CardMedia,Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pencilSquare from "../assets/pencil-square.svg";
import fileEarmarkArrowUp from "../assets/file-earmark-arrow-up.svg";
import fileEarmark from "../assets/file-earmark-1.svg";
import psna1 from "../assets/psna1.jpeg";
import psna2 from "../assets/psna2.jpeg";
import psna3 from "../assets/psna3.jpeg";
import { grey } from "@mui/material/colors";






const Home = () => {

  const images = [
    psna1,
    psna2, 
    psna3
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

  };

  const navigate = useNavigate();

  const handleUpload = () => {
    navigate('/upload');
  };

  const handleStudentMarkEntry = () => {
    navigate('/studentMarkEntry');
  };

  return (
   <Box
    backgroundColor="#FBFBFB" 

>
     <Header />
     <Box sx={{ width: "96%", margin: "auto", mt: 2 }}>
       <Slider {...settings}>
      {images.map((src, index) => (
        <Card key={index}>
          <CardMedia component="img" image={src} alt={`Slide ${index}`}width="100%"height="500 " />
        </Card>
      ))}
    </Slider>
    </Box>
    

    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="50vh"
      gap={2}
    >
     

      
<Typography
     sx={
      {ml:{lg:-90,sx:0,xs:0,sm:0,md:-80},
        mt:{lg:-15,sx:0,xs:0,sm:0,md:0},
      
     }}
> 
      <Button onClick={handleUpload}
      sx={{ 
        border: "2px solid black",
       borderRadius: 2, 
       color: "#555555",
       borderColor: "black", 
       paddingX: 2,
       backgroundColor: "transparent",  
       "&:hover": { 
         backgroundColor: "rgba(0, 0, 0, 0.1)" 
       } ,
       width: 300,
       height: 70,
     }}
      >
      <img src={fileEarmarkArrowUp} alt="File Upload Icon" width={30} height={30} />  
      Upload QuestionPaper
      </Button>
</Typography>

<Typography
    sx={{
      
        ml:{lg: -9,md:0,xs:0,sm:0,sx:0},
        mt:{lg: -10.89,md:-10.9,xs:0,sm:0,sx:0},
      

    }}
>

      <Button onClick={handleStudentMarkEntry} sx={{ 
     border: "2px solid black",
    borderRadius: 2, 
    color: "#555555",  
    borderColor: "black",
    paddingX: 2,
    backgroundColor: "transparent",  
    "&:hover": { 
      backgroundColor: "rgba(0, 0, 0, 0.1)" 
    } ,
    width: 300,
       height: 70
  }}>
      <img src={pencilSquare} alt="Pencil Icon" width={30} height={30} />
        Student mark entry
      </Button>
</Typography>
<Typography
    sx={{
      
        ml:{lg:74,sx:13,md:80,xs:0,sm:0}, 
       mt:{lg:-10.9,sx:0,md:-10.9,xs:0,sm:0},
     
    }}

 >
    
      <Button onClick={() => navigate('/report')}  
      sx={{ 
        border: "2px solid black",
       borderRadius: 2, 
       color: "#555555", 
       borderColor: "black", 
       paddingX: 2,
       backgroundColor: "transparent",  
       "&:hover": { 
         backgroundColor: "rgba(0, 0, 0, 0.1)" 
       }, 
       width: 300,
       height: 70
     }}
      >
      <img src={fileEarmark} alt="File Earmark Icon" width={40} height={30} />
        Generate Report
      </Button>
</Typography>
    </Box>
    </Box>
   
  );
};

export default Home;
