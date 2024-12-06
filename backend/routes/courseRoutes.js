const express = require('express');
const { createCourse, updateCourse } = require('../controllers/courseController.js');
const router = express.Router();

router.post('/createCourse', createCourse);
router.put('/updateCourse/:courseId', updateCourse);

module.exports = router;