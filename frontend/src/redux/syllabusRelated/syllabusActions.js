// frontend/src/redux/syllabusRelated/syllabusActions.js
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

// Configure axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus: status => status >= 200 && status < 300
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      data: config.data
    });
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

// Fetch all syllabi
export const getSyllabi = () => async (dispatch) => {
  dispatch(getSyllabusRequest());
  try {
    const response = await axiosInstance.get('/api/syllabus/getSyllabus');
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
    const response = await axiosInstance.get(`/api/syllabus/getSyllabus/${id}`);
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

    const payload = {
      courseId: syllabusData.courseId,
      content: syllabusData.content
    };

    console.log('Uploading syllabus with data:', payload);

    const response = await axiosInstance.post('/api/syllabus/uploadSyllabus', payload);

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

    const response = await axiosInstance.put(`/api/syllabus/updateSyllabus/${id}`, syllabusData);
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
    await axiosInstance.delete(`/api/syllabus/deleteSyllabus/${id}`);
    dispatch(deleteSyllabusSuccess(id));
  } catch (error) {
    dispatch(getSyllabusFailed(error.message));
    throw error;
  }
};