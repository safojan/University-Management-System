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
    }
});

module.exports = mongoose.model('Syllabus', syllabusSchema);