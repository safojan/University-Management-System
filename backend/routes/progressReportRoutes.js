const express = require('express');
const { generateStudentProgressReport, generateClassProgressReport, generateSchoolProgressReport } = require('../controllers/progressReportController.js');
const router = express.Router();

// Route to generate a progress report for a specific student
router.get('/student/:studentId', generateStudentProgressReport);

// Route to generate a progress report for a specific class
router.get('/class/:classId', generateClassProgressReport);

// Route to generate a progress report for the entire school
router.get('/school/:schoolId', generateSchoolProgressReport);

module.exports = router;