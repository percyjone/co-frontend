import React,{useEffect, useState} from 'react'
import QuestionMapTable from '../components/QuestionMapTable'
import SelectionComponent from '../components/Selection'
import { getExamQuestions } from '../apiHelpers/apiHelpers';
import QuestionMarkEntryTable from '../components/QuestionMarkEntryTable.jsx';
import { Button } from '@mui/material';
import UploadQP from '../components/UploadQP.jsx';


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
            <div>Loading questions...</div>
          ) : questions.length === 0 ? (
            <>
            {/* To write styling to questions not found component */}
              No Questions Found for {selectionData.subject} {selectionData.examName}{' '}
              {selectionData.examYear} {selectionData.semester}
              <UploadQP subjectCode={selectionData.subject} examName={selectionData.examName} examYear={selectionData.examYear} semester={selectionData.semester}/>
            </>
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
