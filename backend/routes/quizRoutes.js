const express = require('express');
const { createQuiz, updateQuiz, getQuiz, deleteQuiz, getAllQuizzes } = require('../controllers/quizController.js');
const router = express.Router();

// Route to create a new quiz
router.post('/createQuiz', createQuiz);

// Route to update an existing quiz
router.put('/updateQuiz/:quizId', updateQuiz);

// Route to get a quiz by ID
router.get('/getQuiz/:quizId', getQuiz);

// Route to delete a quiz by ID
router.delete('/deleteQuiz/:quizId', deleteQuiz);

// Route to get all quizzes
router.get('/', getAllQuizzes);

module.exports = router;