const express = require('express');
const {
  getAllSyllabi,
  getSyllabusById,
  createSyllabus,
  updateSyllabus,
  deleteSyllabus,
} = require('../controllers/syllabusController');
const router = express.Router();

// Route to fetch all syllabi, sorted by date
router.get('/', getAllSyllabi);

// Route to fetch a specific syllabus by ID
// router.get('/:id', getSyllabusById);

// Route to create a new syllabus
router.post('/', createSyllabus);

// Route to update a syllabus by ID
// router.put('/:id', updateSyllabus);

// Route to delete a syllabus by ID
 router.delete('/:id', deleteSyllabus);

module.exports = router;
