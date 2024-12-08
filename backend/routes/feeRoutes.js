const express = require('express');
const { 
    getFeeStructure, 
    createFee, 
    updateFee, 
    deleteFee, 
    addPayment, 
    generateReceipt, 
    stripePayment 
} = require('../controllers/feeController');  // Ensure the path to the controller is correct
const router = express.Router();

router.get('/:rollNumber', getFeeStructure);  // Get Fee Structure for a specific student using roll number
router.post('/create', createFee);  // Create a new fee structure
router.put('/:rollNumber/update', updateFee);  // Update fee structure for a specific student using roll number
router.delete('/:rollNumber', deleteFee);  // Delete fee structure for a specific student using roll number
router.post('/payment', addPayment);  // Add payment
router.post('/receipt', generateReceipt);  // Generate receipt for a specific payment
router.post('/stripe-payment', stripePayment);  // Stripe payment

module.exports = router;
