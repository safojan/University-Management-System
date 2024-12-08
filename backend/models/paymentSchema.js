const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true }, // Reference to the student making the payment
    amount: { type: Number, required: true }, // Amount paid
    method: { type: String, required: true }, // Payment method (e.g., 'credit card', 'bank transfer')
    transactionId: { type: String, required: true }, // Unique transaction ID (e.g., from payment gateway)
    date: { type: Date, default: Date.now }, // Date of payment
});

module.exports = mongoose.model('Payment', paymentSchema);
