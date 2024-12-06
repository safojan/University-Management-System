import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    loading: false,
    error: null,
    response: null,
};

const communicationSlice = createSlice({
    name: 'communication',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        sendMessageSuccess: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getMessagesSuccess: (state, action) => {
            state.messages = action.payload;
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
    sendMessageSuccess,
    getMessagesSuccess,
    getFailed,
    getError
} = communicationSlice.actions;

export const communicationReducer = communicationSlice.reducer;