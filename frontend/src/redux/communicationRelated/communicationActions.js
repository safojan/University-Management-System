import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    sendMessageSuccess,
    getMessagesSuccess
} from './communicationSlice';

export const sendMessageToParent = (parentId, message) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/communication/sendMessage/${parentId}`, message);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(sendMessageSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getMessagesForParent = (parentId) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/communication/messages/parent/${parentId}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getMessagesSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}