import React,{useEffect, useState} from 'react'
import QuestionMapTable from '../components/QuestionMapTable'
import SelectionComponent from '../components/Selection'
import { getExamQuestions } from '../apiHelpers/apiHelpers';
import QuestionMarkEntryTable from '../components/QuestionMarkEntryTable.jsx';
import { Button } from '@mui/material';
import UploadQP from '../components/UploadQP.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';




const UploadQuestionPaper = () => {
  const [selectionData, setSelectionData] = useState({
    subject: '',
    examName: '',
    examYear: '',
    semester: '',
    year: '',
    sec:''
  });
  const [questions, setQuestions] = useState([]);
  const [showQuestionSelection,setShowQuestionSelection] = useState(true);
  const [showStudentSelection,setShowStudentSelection] = useState(true);
  const [loading, setLoading] = useState(false);


  const handleQuestionPaperSubmit = (formData) => {
    setSelectionData(formData);
    setShowQuestionSelection(false);
  }

  const handleStudentClassSubmit = (formData) => {
    setSelectionData((prevData) => ({
      ...prevData,
      year: formData.year, 
      sec: formData.sec, 
    }));
    setShowStudentSelection(false);
  }

  console.log(selectionData);

  useEffect(() => {
    if (!selectionData.subject) return;
    setLoading(true);
    const data = {
      subjectName: selectionData.subject,
      exam: {
        examName: selectionData.examName,
        year: selectionData.examYear, 
        semester: selectionData.semester,
      },
    };
  
    getExamQuestions(data.subjectName, data.exam)
      .then((response) => {
        setQuestions(response);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectionData]);

  return (
    <>
      {showQuestionSelection && (
        <SelectionComponent context="questionPaperEntry" onSubmit={handleQuestionPaperSubmit} />
      )}
      {!showQuestionSelection && (
        <>
        {/* To write styling to loading component */}
        
        {loading ? (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      width: '100%',
           }}
  >
                <CircularProgress />
           </div>
        )
        :questions.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="20vh"
            textAlign="center"
            sx={{ p: 2 }}
          >
            {/* To write styling to questions not found component */}
            <Typography variant="h6" gutterBottom>
  No questions available for <br />{' '}
  <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
    {selectionData.subject}
  </Typography>{' '}
  -{' '}
  <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
    {selectionData.examName}
  </Typography>{' '}
  (
  <Typography component="span" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
    {selectionData.examYear} - {selectionData.semester} Semester
  </Typography>
  ) 
</Typography>

            <UploadQP 
              subjectCode={selectionData.subject} 
              examName={selectionData.examName} 
              examYear={selectionData.examYear} 
              semester={selectionData.semester} 
            />
          </Box>
        ) : (
            <>
              {showStudentSelection && (
                <SelectionComponent context="markEntryPage" onSubmit={handleStudentClassSubmit} />
              )}
              {!showStudentSelection && (
                <>
                  {/*To write Collapsible component to show questionMapTable */}
                  <QuestionMapTable canSave={false} questions={questions}  />
                  <QuestionMarkEntryTable questions={questions} />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );

}

export default UploadQuestionPaper
