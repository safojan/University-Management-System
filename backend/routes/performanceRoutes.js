const express = require('express');
const { getStudentProgress, getClassProgress, getSchoolProgress } = require('../controllers/performanceController.js');
const router = express.Router();

// Route to get progress for a specific student
router.get('/student/:studentId', getStudentProgress);

// Route to get progress for a specific class
router.get('/class/:classId', getClassProgress);

// Route to get progress for the entire school
router.get('/school/:schoolId', getSchoolProgress);

module.exports = router;