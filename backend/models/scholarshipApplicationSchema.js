const mongoose = require('mongoose');

const scholarshipApplicationSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
  scholarshipType: { type: String, required: true },
  applicationDate: { type: Date, default: Date.now },
  documents: [{ type: String }],  // Array of document names
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});

module.exports = mongoose.model('ScholarshipApplication', scholarshipApplicationSchema);
