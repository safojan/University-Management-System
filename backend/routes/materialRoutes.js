const express = require('express');
const { uploadMaterial, updateMaterial, getMaterial, deleteMaterial } = require('../controllers/materialController.js');
const router = express.Router();

// Route to upload a new study material
router.post('/uploadMaterial', uploadMaterial);

// Route to update an existing study material
router.put('/updateMaterial/:materialId', updateMaterial);

// Route to get a study material by ID
router.get('/:rollNum', getMaterial);

// Route to delete a study material by ID
router.delete('/deleteMaterial/:materialId', deleteMaterial);

module.exports = router;