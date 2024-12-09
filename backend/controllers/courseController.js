const Course = require('../models/courseSchema.js'); // Assuming you have a Course model
const Student = require('../models/studentSchema');
const Subject= require('../models/subjectSchema.js');


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

const enrollCourse = async (req, res) => {
    const { subCode, rollNum } = req.body;

    try {
        console.log("Received subCode:", subCode); // Log the subCode for debugging
        console.log("Received rollNum:", rollNum); // Log the rollNum for debugging
        // Fetch the student by roll number
        const student = await Student.findOne({ rollNum });
        if (!student) return res.status(404).json({ message: 'Student not found' });

        // Fetch the course by subject code
        const course = await Subject.findOne({ subCode }).populate('prerequisiteSubject');
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Check if the student is already enrolled in the course
        if (course.enrolledStudents.includes(student._id)) {
            return res.status(400).json({ message: 'Student already enrolled in this course' });
        }

        // Check if the student is already enrolled in 5 courses
        if (student.registeredCourses.length >= 5) {
            return res.status(400).json({ message: 'Student cannot enroll in more than 5 courses' });
        }

        // Check for prerequisite requirement
        if (course.prerequisiteSubject) {
            const prerequisiteCourse = course.prerequisiteSubject;
            // Check if the student has enrolled in the prerequisite subject
            const hasCompletedPrerequisite = student.registeredCourses.includes(prerequisiteCourse._id);
            if (!hasCompletedPrerequisite) {
                return res.status(400).json({ message: `You must enroll in ${prerequisiteCourse.subName} before enrolling in ${course.subName}` });
            }
        }

        // Enroll the student
        course.enrolledStudents.push(student._id);
        student.registeredCourses.push(course._id);

        // Save changes to both models
        await course.save();
        await student.save();

        res.status(200).json({ message: 'Enrollment successful', course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const deleteCourse = async (req, res) => {
    const { subCode, rollNum } = req.body;

    try {
        // Debugging logs
        console.log("Attempting to delete:", { subCode, rollNum });

        // Find the student by roll number
        const student = await Student.findOne({ rollNum });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Find the subject by subCode
        const subject = await Subject.findOne({ subCode });
        if (!subject) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the student is enrolled in the course by comparing the ObjectId
        const courseIndex = student.registeredCourses.findIndex(course => course.toString() === subject._id.toString());

        if (courseIndex === -1) {
            return res.status(400).json({ message: 'Student is not enrolled in this course' });
        }

        // Remove the course from student's registered courses
        student.registeredCourses.splice(courseIndex, 1);

        // Remove student from the subject's enrolledStudents array
        subject.enrolledStudents = subject.enrolledStudents.filter(studentId => studentId.toString() !== student._id.toString());

        // Save the updated student and subject records
        await student.save();
        await subject.save();

        res.status(200).json({ message: 'Course successfully removed' });
    } catch (error) {
        console.error("Error in deleteCourse:", error);
        res.status(500).json({ message: 'Error deleting course', error });
    }
};


// Get enrolled courses for a student
const getEnrolledCourses = async (req, res) => {
    const { rollNum } = req.params;

    try {
        // Find the student by roll number
        const student = await Student.findOne({ rollNum }).populate('registeredCourses');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ courses: student.registeredCourses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching enrolled courses' });
    }
};

// Export the functions
module.exports = {
    createCourse,
    updateCourse,
    enrollCourse,
    deleteCourse,
    getEnrolledCourses
};