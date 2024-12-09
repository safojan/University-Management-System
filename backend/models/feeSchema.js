const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true }, // Reference to the Student model
    feeStructure: { 
        tuition: Number, 
        hostel: Number, 
        otherFees: Number, 
        totalFee: { type: Number, required: true }, // Total fee
    },
    paymentHistory: [
        {
            amount: Number,
            date: Date,
            method: String,
            transactionId: String,
        },
    ],
    totalPaid: { type: Number, default: 0 }, // Tracks the total amount paid so far
    outstandingBalance: { type: Number, required: true }, // Outstanding balance (calculated)
});

// Pre-save hook to update outstanding balance and total paid
feeSchema.pre('save', function (next) {
    this.outstandingBalance = this.feeStructure.totalFee - this.totalPaid;
    next();
});

module.exports = mongoose.model('Fee', feeSchema);
