// frontend/src/redux/courseRelated/courseActions.js
import axios from 'axios';
import {
    fetchCoursesRequest,
    fetchCoursesSuccess,
    fetchCoursesFailure,
    createCourseRequest,
    createCourseSuccess,
    createCourseFailure,
    updateCourseRequest,
    updateCourseSuccess,
    updateCourseFailure,
    deleteCourseRequest,
    deleteCourseSuccess,
    deleteCourseFailure,
    fetchCourseDetailsRequest,
    fetchCourseDetailsSuccess,
    fetchCourseDetailsFailure,
} from './courseSlice';

export const getCourses = () => async (dispatch) => {
    dispatch(fetchCoursesRequest());
    try {
        const response = await axios.get('/api/courses');
        dispatch(fetchCoursesSuccess(response.data));
    } catch (error) {
        dispatch(fetchCoursesFailure(error.message));
    }
};

export const createCourse = (courseData) => async (dispatch) => {
    dispatch(createCourseRequest());
    try {
        const response = await axios.post('/api/courses', courseData);
        dispatch(createCourseSuccess(response.data));
    } catch (error) {
        dispatch(createCourseFailure(error.message));
    }
};

export const updateCourse = (id, courseData) => async (dispatch) => {
    dispatch(updateCourseRequest());
    try {
        const response = await axios.put(`/api/courses/${id}`, courseData);
        dispatch(updateCourseSuccess(response.data));
    } catch (error) {
        dispatch(updateCourseFailure(error.message));
    }
};

export const deleteCourse = (id) => async (dispatch) => {
    dispatch(deleteCourseRequest());
    try {
        await axios.delete(`/api/courses/${id}`);
        dispatch(deleteCourseSuccess(id));
    } catch (error) {
        dispatch(deleteCourseFailure(error.message));
    }
};

export const getCourseDetails = (id) => async (dispatch) => {
    dispatch(fetchCourseDetailsRequest());
    try {
        const response = await axios.get(`/api/courses/${id}`);
        dispatch(fetchCourseDetailsSuccess(response.data));
    } catch (error) {
        dispatch(fetchCourseDetailsFailure(error.message));
    }
};