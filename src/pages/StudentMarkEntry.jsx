import React,{useEffect, useState} from 'react'
import SelectionComponent from '../components/Selection';
import {getExamQuestions,getStudentsByYearSecAndDept,getStudentQuestionMarksByStudentIdQuestionId} from '../apiHelpers/apiHelpers';
import QuestionMarkEntryTable from '../components/QuestionMarkEntryTable.jsx';
import CircularProgress from '@mui/material/CircularProgress';


const StudentMarkEntry = ({subject,examName,examYear,semester}) => {

    const [questions, setQuestions] = useState([]);
    const [students, setStudents] = useState([]);
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

    useEffect(() => {
      if (selectionData.year && selectionData.sec && selectionData.dept) {
        const data = {
          year: selectionData.year,
          sec: selectionData.sec,
          dept:selectionData.dept
        };
        getStudentsByYearSecAndDept(data.year, data.sec,data.dept)
          .then((response) => {
            setStudents(response);
            console.log("Students:",response);
          })
          .catch((error) => {
            console.error('Error fetching questions:', error);
          });
        
        }
    },[selectionData.year,selectionData.sec,selectionData.dept]);

    useEffect(() => {
        if (questions.length > 0 && students.length > 0) {
          setLoading(true);
          // Prepare an array of promises
          const studentQuestionMarksPromises = students.flatMap(student =>
            questions.map(question =>
              getStudentQuestionMarksByStudentIdQuestionId(student.id, question.id)
                .then(response => ({
                  studentId: student.id,
                  questionId: question.id,
                  acquiredMarks: response?.mark || '', // Use mark if present, default to ''
                }))
                .catch(() => ({
                  studentId: student.id,
                  questionId: question.id,
                  acquiredMarks: '', // Default to empty on error
                }))
            )
          );
      
          // Resolve all promises and process data
          Promise.all(studentQuestionMarksPromises)
            .then(fetchedData => {
              // Map students to include name, ID, and answers array
              const mappedData = students.map(student => ({
                studentId: student.id,
                name: student.name,
                answers: questions.map(question => {
                  // Find DB data for this student and question
                  const existingEntry = fetchedData.find(
                    entry =>
                      entry.studentId === student.id &&
                      entry.questionId === question.id
                  );
      
                  // Merge existing data if available, otherwise initialize defaults
                  return {
                    questionId: question.id,
                    questionNo: String(question.no) + question.option,
                    acquiredMark: existingEntry?.acquiredMarks || '',
                    totalMark: question.marks,
                    questionCo: question.coId,
                    isEditable: true,
                  };
                }),
              }));
      
              setStudentData(mappedData);
            })
            .catch(error => {
              console.error('Error fetching student question marks:', error);
            })
            .finally(() => {
              setLoading(false);
            })
        }
      }, [questions, students]);
      


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
    {studentData.length > 0 && questions.length > 0 && students.length > 0 &&
    <>
    <h1>{selectionData.examName} {selectionData.examYear} {selectionData.semester} {selectionData.subject}</h1>
    <h1>{selectionData.year} {selectionData.sec} {selectionData.dept}</h1>
    <QuestionMarkEntryTable subject={selectionData.subject} questions={questions} students={students} studentsQuestionsData={studentData}/>
    </>
    }
    </div>
  )
}

export default StudentMarkEntry;
