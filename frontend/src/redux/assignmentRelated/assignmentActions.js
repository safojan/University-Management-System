// frontend/src/redux/assignmentRelated/assignmentActions.js
import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './assignmentSlice';

export const getAssignments = () => async (dispatch) => {
    dispatch(getRequest());
    try {
        const response = await axios.get('/api/assignments');
        dispatch(getSuccess(response.data));
    } catch (error) {
        dispatch(getFailed(error.message));
    }
};

export const deleteAssignment = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        await axios.delete(`/api/assignments/${id}`);
        dispatch(getSuccess(id));
    } catch (error) {
        dispatch(getFailed(error.message));
    }
};