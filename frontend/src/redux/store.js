import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
<<<<<<< HEAD
import { communicationReducer } from './communicationRelated/communicationSlice';
import { progressReportReducer } from './progressReportRelated/progressReportSlice';
=======
>>>>>>> c7bf637b2847ecdae0bebf3962bd1b69c26c6d2e

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
<<<<<<< HEAD
        sclass: sclassReducer,
        communication: communicationReducer,
        progressReport: progressReportReducer,
=======
        sclass: sclassReducer
>>>>>>> c7bf637b2847ecdae0bebf3962bd1b69c26c6d2e
    },
});

export default store;
