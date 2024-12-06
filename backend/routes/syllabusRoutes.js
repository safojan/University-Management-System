const express = require('express');
const { uploadSyllabus, updateSyllabus, getSyllabus, deleteSyllabus } = require('../controllers/syllabusController.js');
const router = express.Router();

// Route to upload a new syllabus
router.post('/uploadSyllabus', uploadSyllabus);

// Route to update an existing syllabus
router.put('/updateSyllabus/:syllabusId', updateSyllabus);

// Route to get a syllabus by ID
router.get('/getSyllabus/:syllabusId', getSyllabus);

// Route to delete a syllabus by ID
router.delete('/deleteSyllabus/:syllabusId', deleteSyllabus);

module.exports = router;