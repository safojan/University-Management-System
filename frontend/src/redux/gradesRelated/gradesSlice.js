// frontend/src/redux/gradesRelated/gradesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    grades: [],
    assignment: [],
    gradeDetails: null,
    loading: false,
    error: null,
};

const gradesSlice = createSlice({
    name: 'grades',
    initialState,
    reducers: {

        getAssignmentsRequest: (state) => {
            state.loading = true;
          },
          getAssignmentsSuccess: (state, action) => {
            state.assignments = action.payload;
            state.loading = false;
          },
          getAssignmentsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
          // Add underControl reducer
          underControl: (state) => {
            state.status = 'idle';
            state.error = null;
          },

        fetchGradesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchGradesSuccess: (state, action) => {
            state.loading = false;
            state.grades = action.payload;
        },
        fetchGradesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createGradeRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        createGradeSuccess: (state, action) => {
            state.loading = false;
            state.grades.push(action.payload);
        },
        createGradeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateGradeRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateGradeSuccess: (state, action) => {
            state.loading = false;
            const index = state.grades.findIndex(grade => grade._id === action.payload._id);
            if (index !== -1) {
                state.grades[index] = action.payload;
            }
        },
        updateGradeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteGradeRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteGradeSuccess: (state, action) => {
            state.loading = false;
            state.grades = state.grades.filter(grade => grade._id !== action.payload);
        },
        deleteGradeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchGradeDetailsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchGradeDetailsSuccess: (state, action) => {
            state.loading = false;
            state.gradeDetails = action.payload;
        },
        fetchGradeDetailsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
getGradesRequest: (state) => {
    state.loading = true;
    state.error = null;
},
getGradesSuccess: (state, action) => {
    state.loading = false;
    state.grades = action.payload;
},
getGradesFailure: (state, action) => {
    state.loading = false; 
    state.error = action.payload;
},

    },
});

export const {
    getAssignmentsRequest,
  getAssignmentsSuccess,
  getAssignmentsFailure,
  underControl,
    fetchGradesRequest,
    fetchGradesSuccess,
    fetchGradesFailure,
    createGradeRequest,
    createGradeSuccess,
    createGradeFailure,
    updateGradeRequest,
    updateGradeSuccess,
    updateGradeFailure,
    deleteGradeRequest,
    deleteGradeSuccess,
    deleteGradeFailure,
    fetchGradeDetailsRequest,
    fetchGradeDetailsSuccess,
    fetchGradeDetailsFailure,
    getGradesRequest,
    getGradesSuccess, 
    getGradesFailure,
} = gradesSlice.actions;

export const gradesReducer = gradesSlice.reducer;