const Fee = require('../models/feeSchema');
const Student = require('../models/studentSchema'); 
const Payment = require('../models/paymentSchema'); 
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Get Fee Structure by Roll Number
exports.getFeeStructure = async (req, res) => {
    const rollNum = req.params.rollNumber;  // Use rollNumber from the route
    console.log(rollNum);

    try {
        // Fetch the student by roll number
        const student = await Student.findOne({ rollNum });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Fetch the fee structure using studentId
        const fee = await Fee.findOne({ studentId: student._id });
        if (!fee) {
            return res.status(404).json({ message: 'Fee structure not found' });
        }

        res.status(200).json(fee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fee structure', error });
    }
};

// Create Fee Structure
exports.createFee = async (req, res) => {
    const { rollNumber, feeStructure } = req.body;
    const rollNum=rollNumber
    try {
        const student = await Student.findOne({ rollNum });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const existingFee = await Fee.findOne({ studentId: student._id });
        if (existingFee) {
            return res.status(400).json({ message: 'Fee structure already exists for this student' });
        }

        const totalFee = feeStructure.tuition + feeStructure.hostel + feeStructure.otherFees;
        const newFee = new Fee({
            studentId: student._id,
            feeStructure: { ...feeStructure, totalFee },
            outstandingBalance: totalFee,
        });

        await newFee.save();
        res.status(201).json({ message: 'Fee structure created successfully', fee: newFee });
    } catch (error) {
        res.status(500).json({ message: 'Error creating fee structure', error });
    }
};

// Update Fee Structure
exports.updateFee = async (req, res) => {
    const rollNumber = req.params.rollNumber;
    const { feeStructure } = req.body;
    try {
        const student = await Student.findOne({ rollNum: rollNumber });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const fee = await Fee.findOne({ studentId: student._id });
        if (!fee) {
            return res.status(404).json({ message: 'Fee structure not found' });
        }

        const totalFee = feeStructure.tuition + feeStructure.hostel + feeStructure.otherFees;
        fee.feeStructure = { ...feeStructure, totalFee };
        fee.outstandingBalance = totalFee - fee.totalPaid;

        await fee.save();
        res.status(200).json({ message: 'Fee structure updated successfully', fee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating fee structure', error });
    }
};

// Delete Fee Structure
exports.deleteFee = async (req, res) => {
    const rollNumber = req.params.rollNumber;
    try {
        const student = await Student.findOne({ rollNum: rollNumber });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const fee = await Fee.findOneAndDelete({ studentId: student._id });
        if (!fee) {
            return res.status(404).json({ message: 'Fee structure not found' });
        }
        res.status(200).json({ message: 'Fee structure deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting fee structure', error });
    }
};

// Add Payment
exports.addPayment = async (req, res) => {
    const { rollNumber, amount, method, transactionId } = req.body;
    try {
        // Fetch the student by roll number
        const student = await Student.findOne({ rollNum: rollNumber });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Fetch the fee structure using studentId
        const fee = await Fee.findOne({ studentId: student._id });
        if (!fee) {
            return res.status(404).json({ message: 'Fee structure not found' });
        }

        fee.paymentHistory.push({ amount, date: new Date(), method, transactionId });
        fee.totalPaid += amount;
        fee.outstandingBalance -= amount;
        await fee.save();
        res.status(200).json({ message: 'Payment added successfully', fee });
    } catch (error) {
        res.status(500).json({ message: 'Error adding payment', error });
    }
};

// Generate Receipt
exports.generateReceipt = async (req, res) => {
    const { rollNumber, transactionId } = req.body;
    const rollNum=rollNumber
    try {
        const student = await Student.findOne({ rollNum });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const fee = await Fee.findOne({ studentId: student._id });
        if (!fee) {
            return res.status(404).json({ message: 'Fee structure not found' });
        }

        const payment = fee.paymentHistory.find(p => p.transactionId === transactionId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ receipt: payment });
    } catch (error) {
        res.status(500).json({ message: 'Error generating receipt', error });
    }
};

// Handle Stripe payment
exports.stripePayment = async (req, res) => {
    const { tokenId, amount, rollNum } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount: amount * 100,
            currency: 'pkr',
            description: 'Fee Payment',
            source: tokenId,
        });
        const student = await Student.findOne({ rollNum });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const feeDetails = await Fee.findOne({  studentId: student._id });

        if (!feeDetails) {
            return res.status(404).json({ message: 'Student fee details not found' });
        }

        feeDetails.totalPaid += amount;
        feeDetails.outstandingBalance = feeDetails.feeStructure.totalFee - feeDetails.totalPaid;

        await feeDetails.save();

        const payment = new Payment({
            studentId,
            amount,
            method: 'Stripe',
            transactionId: charge.id,
            date: new Date(),
        });

        await payment.save();

        return res.status(200).json({ message: 'Payment successful via Stripe' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Stripe payment failed', error });
    }
};
