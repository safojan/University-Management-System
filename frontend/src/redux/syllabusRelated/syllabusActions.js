import axios from 'axios';
import {
  getSyllabusRequest,
  getSyllabusSuccess,
  getSyllabusFailed,
  deleteSyllabusSuccess,
  getSyllabusDetailsRequest,
  getSyllabusDetailsSuccess,
  getSyllabusDetailsFailed,
  uploadSyllabusRequest,
  uploadSyllabusSuccess,
  uploadSyllabusFailed,
  updateSyllabusRequest,
  updateSyllabusSuccess,
  updateSyllabusFailed
} from './syllabusSlice';

// Base URL for API
const baseURL = process.env.REACT_APP_BASE_URL;

// Fetch all syllabi
export const getSyllabi = () => async (dispatch) => {
  dispatch(getSyllabusRequest());
  try {
    const response = await axios.get(`${baseURL}/api/syllabus/`);
    dispatch(getSyllabusSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(getSyllabusFailed(error.message));
    throw error;
  }
};

// Fetch syllabus details by ID
export const getSyllabusDetails = (id) => async (dispatch) => {
  dispatch(getSyllabusDetailsRequest());
  try {
    if (!id) throw new Error('Syllabus ID is required');
    const response = await axios.get(`${baseURL}/api/syllabus/getSyllabus/${id}`);
    dispatch(getSyllabusDetailsSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(getSyllabusDetailsFailed(error.message));
    throw error;
  }
};

// Upload a new syllabus
export const uploadSyllabus = (syllabusData) => async (dispatch) => {
  dispatch(uploadSyllabusRequest());
  try {
    // Validate input
    if (!syllabusData?.courseId) throw new Error('Course ID is required');
    if (!syllabusData?.content) throw new Error('Content is required');
    if (!syllabusData?.expectedCompletionDate) throw new Error('Expected Completion Date is required');

    console.log(syllabusData)

    const payload = {
      courseId: syllabusData.courseId,
      content: syllabusData.content,
      expectedCompletionDate: syllabusData.expectedCompletionDate,
    };

    const response = await axios.post(`${baseURL}/api/syllabus/`, payload);
    dispatch(uploadSyllabusSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(uploadSyllabusFailed(error.message));
    throw error;
  }
};

// Update an existing syllabus
export const updateSyllabus = (id, syllabusData) => async (dispatch) => {
  dispatch(updateSyllabusRequest());
  try {
    if (!id) throw new Error('Syllabus ID is required');
    if (!syllabusData?.content) throw new Error('Content is required');

    const response = await axios.put(`${baseURL}/api/syllabus/updateSyllabus/${id}`, syllabusData);
    dispatch(updateSyllabusSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(updateSyllabusFailed(error.message));
    throw error;
  }
};

// Delete a syllabus
export const deleteSyllabus = (id) => async (dispatch) => {
  dispatch(getSyllabusRequest());
  try {
    if (!id) throw new Error('Syllabus ID is required');
    await axios.delete(`${baseURL}/api/syllabus/${id}`);
    dispatch(deleteSyllabusSuccess(id));
  } catch (error) {
    dispatch(getSyllabusFailed(error.message));
    throw error;
  }
};
