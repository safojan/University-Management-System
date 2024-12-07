const mongoose = require("mongoose");
const marksSchema = new mongoose.Schema({
    marks: [
        {
            activity: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                required: true
            },
            totalScore: {
                type: Number,
                required: true
            }
        }
    ],
    totalMarks: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Marks', marksSchema);