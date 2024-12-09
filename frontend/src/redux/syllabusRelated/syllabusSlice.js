import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  syllabi: [],
  syllabusDetails: null,
  loading: false,
  error: null,
  status: 'idle',
  response: null
};

const syllabusSlice = createSlice({
  name: 'syllabus',
  initialState,
  reducers: {
    getSyllabusRequest: (state) => {
      state.loading = true;
    },
    getSyllabusSuccess: (state, action) => {
      state.loading = false;
      state.syllabi = action.payload;
      state.error = null;
    },
    getSyllabusFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSyllabusSuccess: (state, action) => {
      state.loading = false;
      state.status = 'deleted';
      state.syllabi = state.syllabi.filter(syllabus => syllabus._id !== action.payload);
    },
    underControl: (state) => {
      state.status = 'idle';
      state.error = null;
      state.response = null;
    },
    getSyllabusDetailsRequest: (state) => {
      state.loading = true;
    },
    getSyllabusDetailsSuccess: (state, action) => {
      state.loading = false;
      state.syllabusDetails = action.payload;
      state.error = null;
    },
    getSyllabusDetailsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadSyllabusRequest: (state) => {
      state.loading = true;
    },
    uploadSyllabusSuccess: (state, action) => {
      state.loading = false;
      state.status = 'added';
      state.syllabi.push(action.payload);
    },
    uploadSyllabusFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSyllabusRequest: (state) => {
      state.loading = true;
    },
    updateSyllabusSuccess: (state, action) => {
      state.loading = false;
      state.status = 'updated';
      const index = state.syllabi.findIndex(s => s._id === action.payload._id);
      if (index !== -1) {
        state.syllabi[index] = action.payload;
      }
    },
    updateSyllabusFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getSyllabusRequest,
  getSyllabusSuccess,
  getSyllabusFailed,
  deleteSyllabusSuccess,
  underControl,
  getSyllabusDetailsRequest,
  getSyllabusDetailsSuccess,
  getSyllabusDetailsFailed,
  uploadSyllabusRequest,
  uploadSyllabusSuccess,
  uploadSyllabusFailed,
  updateSyllabusRequest,
  updateSyllabusSuccess,
  updateSyllabusFailed
} = syllabusSlice.actions;

export const syllabusReducer = syllabusSlice.reducer;
