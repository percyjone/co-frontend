import React from 'react';
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

  const ExamDetails = ({selectionData}) => {
  return (
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
  )
}

export default ExamDetails
