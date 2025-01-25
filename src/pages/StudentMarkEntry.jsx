import React,{useEffect, useState} from 'react'
import SelectionComponent from '../components/Selection';
import {getExamQuestions,getStudentsByYearSecAndDept,getStudentQuestionMarksByStudentIdQuestionId} from '../apiHelpers/apiHelpers';
import { questions } from '../markEntryTableInput';
import QuestionMarkEntryTable from '../components/QuestionMarkEntryTable.jsx';

const StudentMarkEntry = ({subject,examName,examYear,semester}) => {

    //const [questions, setQuestions] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentData, setStudentData] = useState([]);

    const [selectionData, setSelectionData] = useState({
        subject: subject,
        examName: examName,
        examYear: examYear,
        semester: semester,
        year: '',
        sec:'',
        dept:'',
      });

      const handleExamDetails = (formData) => {
        setSelectionData(formData);
      }
    
      const handleStudentDetails = (formData) => {
        setSelectionData((prevData) => ({
          ...prevData,
          year: formData.year, 
          sec: formData.sec,
          dept:formData.dept 
        }));
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
            //setQuestions(response);
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
          // Fetch data from the DB for all student-question combinations
          const studentQuestionMarksPromises = students.map(student =>
            questions.map(question =>
              getStudentQuestionMarksByStudentIdQuestionId(student.id, question.id)
                .then(response => ({
                  studentId: student.id,
                  questionId: question.id,
                  acquiredMarks: response.marks || '', // Use DB data if available
                }))
            )
          );
      
          Promise.all(studentQuestionMarksPromises.flat())
            .then(fetchedData => {
              // Map students to include name, ID, and answers array
              const mappedData = students.map(student => ({
                studentId: student.id,
                studentName: student.name,
                answers: questions.map(question => {
                  // Find DB data for this student and question
                  const existingEntry = fetchedData.find(
                    entry =>
                      entry.studentId === student.id &&
                      entry.questionId === question.id
                  );
      
                  // Merge existing data if available, otherwise initialize defaults
                  return {
                    questionID: question.id,
                    questionNo: (question.no + question.option).trim(),
                    acquiredMark: existingEntry?.marks || '',
                    totalMark: question.marks,
                    questionCo: question.co,
                    isEditable: true,
                  };
                }),
              }));
      
              setStudentData(mappedData);
            })
            .catch(error => {
              console.error('Error fetching student question marks:', error);
            });
        }
      }, [questions, students]);


    console.log(selectionData);
    console.log(studentData);

  return (
    <div>
    { subject === '' &&
      <SelectionComponent context='questionPaperEntry' onSubmit={handleExamDetails}/>
    }

    {questions.length > 0 &&
      <div>
        <SelectionComponent context='markEntryPage' onSubmit={handleStudentDetails}/>
      </div>
    }

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
