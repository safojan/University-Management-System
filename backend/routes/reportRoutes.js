const express = require('express');
const { generateClassAttendanceReport, generateStudentAttendanceReport, generateOverallAttendanceReport } = require('../controllers/reportController.js');
const router = express.Router();

// Route to generate attendance report for a class
router.get('/class/:classId', generateClassAttendanceReport);

// Route to generate attendance report for a student
router.get('/student/:studentId', generateStudentAttendanceReport);

// Route to generate overall attendance report for the school
router.get('/school/:schoolId', generateOverallAttendanceReport);

module.exports = router;