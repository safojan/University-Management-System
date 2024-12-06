import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getClassReportSuccess,
    getStudentReportSuccess,
    getSchoolReportSuccess
} from './progressReportSlice';

export const getClassProgressReport = (classId) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/progressReports/class/${classId}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getClassReportSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getStudentProgressReport = (studentId) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/progressReports/student/${studentId}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getStudentReportSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getSchoolProgressReport = (schoolId) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/progressReports/school/${schoolId}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSchoolReportSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}