const Quiz = require('../models/quizSchema.js'); // Import the Quiz model

// Function to create a new quiz
const createQuiz = async (req, res) => {
    try {
        const { courseId, title, questions } = req.body;

        // Validate input data
        if (!courseId || !title || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Create a new quiz
        const newQuiz = new Quiz({
            courseId,
            title,
            questions
        });

        // Save the quiz to the database
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Error creating quiz', error });
    }
};

// Function to update an existing quiz
const updateQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { title, questions } = req.body;

        // Validate input data
        if (!title || !Array.isArray(questions)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Find the quiz by ID and update it
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            quizId,
            { title, questions },
            { new: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Error updating quiz', error });
    }
};

// Function to get a quiz by ID
const getQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;

        // Find the quiz by ID
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz', error });
    }
};

// Function to delete a quiz by ID
const deleteQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;

        // Find the quiz by ID and delete it
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quiz', error });
    }
};

// Function to get all quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();

        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quizzes', error });
    }
};

// Export the functions
module.exports = {
    createQuiz,
    updateQuiz,
    getQuiz,
    deleteQuiz,
    getAllQuizzes
};
