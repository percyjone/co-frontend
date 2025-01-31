import React,{useEffect, useState} from 'react'
import SelectionComponent from '../components/Selection';
import {getExamQuestions,getStudentsByYearSecAndDept,getStudentQuestionMarksByStudentIdQuestionId, getStudents,getStudentsQuestionsMark} from '../apiHelpers/apiHelpers';
import QuestionMarkEntryTable from '../components/QuestionMarkEntryTable.jsx';
import CircularProgress from '@mui/material/CircularProgress';


const StudentMarkEntry = ({subject,examName,examYear,semester}) => {

    const [questions, setQuestions] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [isExamtSelected, setIsExamSelected] = useState(false);
    const [isStudentSelected, setIsStudentSelected] = useState(false);
    const [loading, setLoading] = useState(false);

    const [selectionData, setSelectionData] = useState({
        subject: subject ? subject : "",
        examName: examName ? examName : "",
        examYear: examYear ? examYear : "",
        semester: semester ? semester : "",
        year: '',
        sec:'',
        dept:'',
      });

      const handleExamDetails = (formData) => {
        setSelectionData(formData);
        setIsExamSelected(true);
      }
    
      const handleStudentDetails = (formData) => {
        setSelectionData((prevData) => ({
          ...prevData,
          year: formData.year, 
          sec: formData.sec,
          dept:formData.dept 
        }));
        setIsStudentSelected(true);
      }


    //Fetch Questions
    useEffect(() => {
      if (selectionData.subject && selectionData.examName && selectionData.examYear && selectionData.semester) {
        const data = {
          subject: selectionData.subject,
          exam: {
            examName: selectionData.examName,
            year: selectionData.examYear,
            semester: selectionData.semester,
          },
        };
        getExamQuestions(data.subject, data.exam)
          .then((response) => {
            setQuestions(response);
            console.log("Questions:",response);
          })
          .catch((error) => {
            console.error('Error fetching questions:', error);
          });
        }
        
    },[selectionData.examName,selectionData.examYear,selectionData.semester,selectionData.subject]);

    //Fetch Students
    useEffect(() => {
      if (questions.length === 0) return;
    
      setLoading(true);
    
      const inputData = {
        exam: {
          subjectCode: selectionData.subject,
          examName: selectionData.examName,
          year: parseInt(selectionData.examYear, 10), // Specify radix to ensure proper conversion
          semester: parseInt(selectionData.semester, 10),
        },
        studentDetail: {
          year: selectionData.year,
          sec: selectionData.sec,
          dept: selectionData.dept,
        },
      };
    
      getStudentsQuestionsMark(inputData.exam, inputData.studentDetail)
        .then(response => {
          const updatedData = response.map(student => {
            // Group questions by base number (e.g., "11" for "11A", "11B", etc.)
            const questionGroups = student.answers.reduce((acc, answer) => {
              const baseQuestionNo = answer.questionNo.replace(/[A-Z]$/, ""); // Extract base number
              if (!acc[baseQuestionNo]) acc[baseQuestionNo] = [];
              acc[baseQuestionNo].push(answer);
              return acc;
            }, {});
    
            // Apply rules within each group
            Object.values(questionGroups).forEach(group => {
              const answeredQuestions = group.filter(answer => answer.acquiredMark !== "");
              
              if (answeredQuestions.length > 0) {
                // Create a Set of marked question numbers (e.g., "11A", "11B")
                const markedQuestionTypes = new Set(answeredQuestions.map(answer => answer.questionNo));
    
                group.forEach(answer => {
                  answer.isEditable = markedQuestionTypes.has(answer.questionNo); // Keep only marked types editable
                });
              } else {
                // If no marks exist, all remain editable
                group.forEach(answer => (answer.isEditable = true));
              }
            });
    
            return {
              studentId: student.studentId,
              name: student.name,
              answers: student.answers,
            };
          });
    
          setStudentData(updatedData);
          console.log("Updated student data:", updatedData);
        })
        .catch(error => {
          console.error("Error fetching student question marks:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [selectionData.year, selectionData.sec, selectionData.dept]);

    console.log(selectionData);
    console.log(studentData);

  return (
    <div>
    { subject === '' && examName === '' && examYear === '' && semester === '' && !isExamtSelected &&
      <SelectionComponent context='questionPaperEntry' onSubmit={handleExamDetails}/>
    }

    {questions.length > 0 && !isStudentSelected &&
      <div>
        <SelectionComponent context='markEntryPage' onSubmit={handleStudentDetails}/>
      </div>
    }
    {loading &&  
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
          width: '100%',
          }}>
          <CircularProgress />
      </div>}
    {studentData.length > 0 && questions.length > 0 &&
    <>
    <h1>{selectionData.examName} {selectionData.examYear} {selectionData.semester} {selectionData.subject}</h1>
    <h1>{selectionData.year} {selectionData.sec} {selectionData.dept}</h1>
    <QuestionMarkEntryTable subject={selectionData.subject} questions={questions} studentsQuestionsData={studentData}/>
    </>
    }
    </div>
  )
}

export default StudentMarkEntry;
