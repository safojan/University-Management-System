const Quiz = require('../models/quizSchema.js'); // Assuming you have a Quiz model
const Student = require('../models/studentSchema.js');

// Function to submit a quiz and calculate the score
const submitQuiz = async (req, res) => {
    try {
        const { quizId, studentId, answers } = req.body;

        // Find the quiz by ID
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Calculate the score
        let score = 0;
        quiz.questions.forEach((question, qIndex) => {
            const correctOption = question.options.find(option => option.isCorrect);
            if (correctOption && answers[qIndex] === correctOption.optionText) {
                score++;
            }
        });

        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Save the quiz result for the student
        student.quizResults.push({ quiz: quizId, score });
        await student.save();

        res.status(200).json({ message: 'Quiz submitted successfully', score });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting quiz', error });
    }
};

// Function to get results for a specific quiz
const getQuizResults = async (req, res) => {
    try {
        const { quizId } = req.params;

        // Find the quiz by ID and populate the results
        const quiz = await Quiz.findById(quizId).populate('results.student', 'name rollNum');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json(quiz.results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz results', error });
    }
};

// Function to get quiz results for a specific student
const getStudentQuizResults = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find the student by ID
        const student = await Student.findById(studentId).populate('quizResults.quiz', 'title');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student.quizResults);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student quiz results', error });
    }
};

// Export the functions
module.exports = {
    submitQuiz,
    getQuizResults,
    getStudentQuizResults
};