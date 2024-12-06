const express = require('express');
const { createAssignment, updateAssignment, getAssignment, deleteAssignment } = require('../controllers/assignmentController.js');
const router = express.Router();

// Route to create a new assignment
router.post('/createAssignment', createAssignment);

// Route to update an existing assignment
router.put('/updateAssignment/:assignmentId', updateAssignment);

// Route to get an assignment by ID
router.get('/getAssignment/:assignmentId', getAssignment);

// Route to delete an assignment by ID
router.delete('/deleteAssignment/:assignmentId', deleteAssignment);

module.exports = router;