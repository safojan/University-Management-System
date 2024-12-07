// frontend/src/redux/gradesRelated/gradesActions.js
import axios from 'axios';
import {
    getAssignmentsRequest,
  getAssignmentsSuccess,
  getAssignmentsFailure,
    fetchGradesRequest,
    fetchGradesSuccess,
    fetchGradesFailure,
    createGradeRequest,
    createGradeSuccess,
    createGradeFailure,
    updateGradeRequest,
    updateGradeSuccess,
    updateGradeFailure,
    deleteGradeRequest,
    deleteGradeSuccess,
    deleteGradeFailure,
    fetchGradeDetailsRequest,
    fetchGradeDetailsSuccess,
    fetchGradeDetailsFailure,
    getGradesRequest,
    getGradesSuccess,
    getGradesFailure,
} from './gradesSlice';

export const getAssignments = () => async (dispatch) => {
    dispatch(getAssignmentsRequest());
    try {
      const response = await axios.get('/api/assignments');
      dispatch(getAssignmentsSuccess(response.data));
    } catch (error) {
      dispatch(getAssignmentsFailure(error.message));
    }
  };
  
  export const deleteAssignment = (id) => async (dispatch) => {
    try {
      await axios.delete(`/api/assignments/${id}`);
      dispatch(getAssignments()); // Refresh assignments after deletion
    } catch (error) {
      dispatch(getAssignmentsFailure(error.message));
    }
  };


// Add class and student grades actions
export const getClassFinalGrades = (classId) => async (dispatch) => {
    dispatch(getGradesRequest());
    try {
      const response = await axios.get(`/api/grades/class/${classId}`);
      dispatch(getGradesSuccess(response.data));
    } catch (error) {
      dispatch(getGradesFailure(error.message));
    }
  };
  
  export const getStudentFinalGrades = (studentId) => async (dispatch) => {
    dispatch(getGradesRequest());
    try {
      const response = await axios.get(`/api/grades/student/${studentId}`);
      dispatch(getGradesSuccess(response.data));
    } catch (error) {
      dispatch(getGradesFailure(error.message));
    }
  };

export const getGrades = () => async (dispatch) => {
    dispatch(fetchGradesRequest());
    try {
        const response = await axios.get('/api/grades');
        dispatch(fetchGradesSuccess(response.data));
    } catch (error) {
        dispatch(fetchGradesFailure(error.message));
    }
};

export const createGrade = (gradeData) => async (dispatch) => {
    dispatch(createGradeRequest());
    try {
        const response = await axios.post('/api/grades', gradeData);
        dispatch(createGradeSuccess(response.data));
    } catch (error) {
        dispatch(createGradeFailure(error.message));
    }
};

export const updateGrade = (id, gradeData) => async (dispatch) => {
    dispatch(updateGradeRequest());
    try {
        const response = await axios.put(`/api/grades/${id}`, gradeData);
        dispatch(updateGradeSuccess(response.data));
    } catch (error) {
        dispatch(updateGradeFailure(error.message));
    }
};

export const deleteGrade = (id) => async (dispatch) => {
    dispatch(deleteGradeRequest());
    try {
        await axios.delete(`/api/grades/${id}`);
        dispatch(deleteGradeSuccess(id));
    } catch (error) {
        dispatch(deleteGradeFailure(error.message));
    }
};

export const getGradeDetails = (id) => async (dispatch) => {
    dispatch(fetchGradeDetailsRequest());
    try {
        const response = await axios.get(`/api/grades/${id}`);
        dispatch(fetchGradeDetailsSuccess(response.data));
    } catch (error) {
        dispatch(fetchGradeDetailsFailure(error.message));
    }
};