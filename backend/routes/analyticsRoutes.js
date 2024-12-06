const express = require('express');
const { getStudentPerformance, getClassPerformance, getSchoolPerformance } = require('../controllers/analyticsController.js');
const router = express.Router();

// Route to get performance analytics for a specific student
router.get('/student/:studentId', getStudentPerformance);

// Route to get performance analytics for a specific class
router.get('/class/:classId', getClassPerformance);

// Route to get performance analytics for the entire school
router.get('/school/:schoolId', getSchoolPerformance);

module.exports = router;