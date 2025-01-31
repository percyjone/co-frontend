import api from './api.js';

export const getStudents = async () => {
    const response = await api.get("/students");
    return response.data;
};

export const getAllSubjects = async () =>{
    const responce = await api.get("/subjects")
    return responce.data;
};

export const getExamQuestions = async (subject, exam) => {
    const response = await api.get(`/questionpaper/examQuestions/${subject}/${exam.examName}/${exam.year}/${exam.semester}`);
    return response.data;
};

export const uploadQuestionPaper = async (file) => {
   const response=  await api.post('/questionpaper/upload', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
}

export const createQuestions = async (subject,questionList,exam) => {
  const response = await api.post('/questionpaper/create', {subject,questionList,exam})
  return response.data;
}

export const getStudentsByYearSecAndDept = async (year, sec, dept) => {
  const response = await api.get(`/students/${year}/${sec}/${dept}`);
  return response.data;
}

export const getStudentQuestionMarksByStudentIdQuestionId = async (studentId, questionId) => {
  const response = await api.get(`/studentQuestionMarks/${studentId}/${questionId}`);
  console.log("from api:",response.data);
  return response.data;
}

export const createStudentsQuestionsMark = async (data) => {
  const response = await api.post('/studentQuestionMarks/create', data);
  return response.data;
}

export const getStudentsQuestionsMark = async (exam,studentDetail) => {
  const response = await api.post('/studentQuestionMarks/getStudentsQuestionsMark', {exam,studentDetail});
  return response.data;
}
