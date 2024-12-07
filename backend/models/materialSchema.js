const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
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
    fileUrl: {
        type: String,
        required: true
    },
    uploadDate: {
         type: Date,
          default: Date.now
    }

});

module.exports = mongoose.model('Material', materialSchema);