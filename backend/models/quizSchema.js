const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: [
        {
            optionText: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true
            }
        }
    ]
});

const quizSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    questions: [questionSchema]
});

module.exports = mongoose.model('Quiz', quizSchema);