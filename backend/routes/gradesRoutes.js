const express = require('express');
const { calculateFinalGrades, getFinalGrades, getClassFinalGrades } = require('../controllers/gradesController.js');
const router = express.Router();

// Route to calculate final grades for a student
router.post('/calculateFinalGrades/:studentId', calculateFinalGrades);

// Route to get final grades for a specific student
router.get('/student/:studentId', getFinalGrades);

// Route to get final grades for a specific class
router.get('/class/:classId', getClassFinalGrades);

module.exports = router;