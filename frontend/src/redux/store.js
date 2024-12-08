import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
import { communicationReducer } from './communicationRelated/communicationSlice';
import { progressReportReducer } from './progressReportRelated/progressReportSlice';
import {assignmentReducer } from './assignmentRelated/assignmentSlice';
import { courseReducer } from './courseRelated/courseSlice';
import { gradesReducer } from './gradesRelated/gradesSlice';
import { syllabusReducer } from './syllabusRelated/syllabusSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer,
        communication: communicationReducer,
        progressReport: progressReportReducer,
        sclass: sclassReducer,
        assignment: assignmentReducer,
        course: courseReducer,
        grades : gradesReducer,
        syllabus: syllabusReducer,
    },
});

export default store;
