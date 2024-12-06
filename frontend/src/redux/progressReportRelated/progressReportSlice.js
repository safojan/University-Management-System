import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    report: [],
    loading: false,
    error: null,
    response: null,
};

const progressReportSlice = createSlice({
    name: 'progressReport',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getClassReportSuccess: (state, action) => {
            state.report = action.payload;
            state.loading = false;
            state.error = null;
        },
        getStudentReportSuccess: (state, action) => {
            state.report = action.payload;
            state.loading = false;
            state.error = null;
        },
        getSchoolReportSuccess: (state, action) => {
            state.report = action.payload;
            state.loading = false;
            state.error = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getRequest,
    getClassReportSuccess,
    getStudentReportSuccess,
    getSchoolReportSuccess,
    getFailed,
    getError
} = progressReportSlice.actions;

export const progressReportReducer = progressReportSlice.reducer;