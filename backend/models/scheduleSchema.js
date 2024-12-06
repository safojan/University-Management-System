const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    timetable: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);