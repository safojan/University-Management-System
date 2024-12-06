const express = require('express');
const { submitQuiz, getQuizResults, getStudentQuizResults } = require('../controllers/quizAssessmentController.js');
const router = express.Router();

// Route to submit a quiz and calculate the score
router.post('/submitQuiz', submitQuiz);

// Route to get results for a specific quiz
router.get('/quiz/:quizId', getQuizResults);

// Route to get quiz results for a specific student
router.get('/student/:studentId', getStudentQuizResults);

module.exports = router;