const express = require('express');
const { trackAttendance, getAttendanceByDate, getAttendanceByStudent, getAttendanceByClass } = require('../controllers/attendanceController.js');
const router = express.Router();

// Route to track daily attendance
router.post('/trackAttendance', trackAttendance);

// Route to get attendance by date
router.get('/getAttendanceByDate/:date', getAttendanceByDate);

// Route to get attendance by student ID
router.get('/getAttendanceByStudent/:studentId', getAttendanceByStudent);

// Route to get attendance by class ID
router.get('/getAttendanceByClass/:classId', getAttendanceByClass);

module.exports = router;