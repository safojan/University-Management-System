const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
