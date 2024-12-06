const mongoose = require('mongoose');

// Define the schema for the Parent model
const parentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    messages: [{
        message: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
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

// Create the Parent model using the schema
const Parent = mongoose.model('Parent', parentSchema);

// Export the Parent model
module.exports = Parent;