import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    postDone,
    doneSuccess,
    getAllTeacherListSuccess
} from './teacherSlice';

export const getAllTeachers = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teachers/${id}`);
        if (result.data.message) {
        
            dispatch(getFailed(result.data.message));
        } else {
            console.log("all teacchers are here : ");
            console.log(result.data);
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getTeacherDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teacher/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const updateTeachSubject = (teacherId, teachSubject) => async (dispatch) => {
    dispatch(getRequest());

    try {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/TeacherSubject`, { teacherId, teachSubject }, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch(postDone());
    } catch (error) {
        dispatch(getError(error));
    }
}

//get all teachers of the school
export const getAllTeacherList = () => async (dispatch) => {
    dispatch(getRequest());

    axios.get(`${process.env.REACT_APP_BASE_URL}/teachers`)
        .then((response) => {
            dispatch(getAllTeacherListSuccess(response.data));
        })
        .catch((error) => {
            dispatch(getError(error));
        });
} 