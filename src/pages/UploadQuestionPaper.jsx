import React,{useEffect, useState} from 'react'
import QuestionMapTable from '../components/QuestionMapTable'
import SelectionComponent from '../components/Selection'
import { getExamQuestions } from '../apiHelpers/apiHelpers';
import QuestionMarkEntryTable from '../components/QuestionMarkEntryTable.jsx';
import { Button } from '@mui/material';
import UploadQP from '../components/UploadQP.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';




const UploadQuestionPaper = () => {
  const navigate = useNavigate();
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
        const formattedQuestions = response.map((q) => ({
          id: q.id,
          no: q.no,
          option: q.option || "",
          subDivision: q.subDivision,
          question: q.text,
          marks: q.marks,
          co: q.coName || null,
          pi: q.pi || null,
        }));
        setQuestions(formattedQuestions);
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
<Box>
            <UploadQP 
              subjectCode={selectionData.subject} 
              examName={selectionData.examName} 
              examYear={selectionData.examYear} 
              semester={selectionData.semester} 
            />
</Box>
          </Box>
        ) : (
            <> 
                <>
                  {/*To write Collapsible component to show questionMapTable */}
                  <Box padding={5}>
                  <QuestionMapTable canSave={false} questions={questions}  /> 
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt:2 }}>             
                  <Button  variant="contained" onClick={() => navigate('/studentMarkEntry')}>Go to mark entry page</Button>  
                  </Box>
                  </Box>
                </>
            </>
          )}
        </>
      )}
    </>
  );

}

export default UploadQuestionPaper
