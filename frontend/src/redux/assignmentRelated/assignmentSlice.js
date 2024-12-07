// frontend/src/redux/assignmentRelated/assignmentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    assignments: [],
    loading: false,
    error: null,
    status: 'idle',
    response: null,
};

const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.loading = false;
            state.assignments = action.payload;
            state.status = 'success';
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = 'failed';
        },
        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
        },
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    underControl
} = assignmentSlice.actions;

export const assignmentReducer = assignmentSlice.reducer;