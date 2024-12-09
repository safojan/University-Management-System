const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');

// Route to submit a new scholarship application
router.post('/submit', scholarshipController.submitApplication);

// Route to get all applications for a student
router.get('/:studentID', scholarshipController.getApplications);

module.exports = router;
