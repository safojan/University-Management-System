const express = require('express');
const { createCourse, updateCourse, enrollCourse, deleteCourse, getEnrolledCourses } = require('../controllers/courseController.js');
const router = express.Router();

router.post('/createCourse', createCourse);
router.put('/updateCourse/:courseId', updateCourse);
router.post('/enroll', enrollCourse);
// Delete a student from a course
router.delete('/delete', deleteCourse);

// Get enrolled courses for a student
router.get('/courses/:rollNum', getEnrolledCourses);

module.exports = router;