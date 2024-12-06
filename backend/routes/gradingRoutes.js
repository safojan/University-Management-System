const express = require('express');
const { gradeAssignment, getAssignmentGrades, getStudentGrades } = require('../controllers/gradingController.js');
const router = express.Router();

// Route to grade an assignment
router.post('/gradeAssignment', gradeAssignment);

// Route to get grades for a specific assignment
router.get('/assignment/:assignmentId', getAssignmentGrades);

// Route to get grades for a specific student
router.get('/student/:studentId', getStudentGrades);

module.exports = router;