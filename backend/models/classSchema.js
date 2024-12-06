const mongoose = require('mongoose');

// Define the schema for the Class model
const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
        unique: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Class model using the schema
const Class = mongoose.model('Class', classSchema);

// Export the Class model
module.exports = Class;