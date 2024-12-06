const Course = require('../models/courseSchema.js'); // Assuming you have a Course model

// Function to create a new course
const createCourse = async (req, res) => {
    try {
        const { courseName, courseCode, syllabus, schedule } = req.body;

        // Check if the course already exists
        const existingCourse = await Course.findOne({ courseCode });
        if (existingCourse) {
            return res.status(400).json({ message: 'Course with this code already exists' });
        }

        // Create a new course
        const newCourse = new Course({
            courseName,
            courseCode,
            syllabus,
            schedule
        });

        // Save the course to the database
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error });
    }
};

// Function to update an existing course
const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { courseName, courseCode, syllabus, schedule } = req.body;

        // Find the course by ID and update it
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { courseName, courseCode, syllabus, schedule },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error });
    }
};

// Export the functions
module.exports = {
    createCourse,
    updateCourse
};