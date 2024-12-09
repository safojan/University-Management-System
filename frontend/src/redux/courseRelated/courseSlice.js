// frontend/src/redux/courseRelated/courseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses:[],
    loading: false,
    error: null,
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        fetchCoursesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCoursesSuccess: (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        },
        fetchCoursesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },



//not using below functions 














        createCourseRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        createCourseSuccess: (state, action) => {
            state.loading = false;
            state.courses.push(action.payload);
        },
        createCourseFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateCourseRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateCourseSuccess: (state, action) => {
            state.loading = false;
            const index = state.courses.findIndex(course => course._id === action.payload._id);
            if (index !== -1) {
                state.courses[index] = action.payload;
            }
        },
        updateCourseFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteCourseRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteCourseSuccess: (state, action) => {
            state.loading = false;
            state.courses = state.courses.filter(course => course._id !== action.payload);
        },
        deleteCourseFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchCourseDetailsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCourseDetailsSuccess: (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        },
        fetchCourseDetailsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        underControl: (state) => {
            state.loading = false;
            state.error = null;
            state.status = 'idle';
        },
    },
});

export const {
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
    underControl,
} = courseSlice.actions;

export const courseReducer = courseSlice.reducer;