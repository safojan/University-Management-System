const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    expectedCompletionDate: {
        type: Date,
        required: true
    },
    isContentComplete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Syllabus', syllabusSchema);