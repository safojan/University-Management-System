const Assignment = require('../models/assignmentSchema.js'); // Assuming you have an Assignment model
const Student = require('../models/studentSchema.js');

// Function to grade an assignment
const gradeAssignment = async (req, res) => {
    try {
        const { assignmentId, studentId, grade } = req.body;

        // Find the assignment by ID
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Check if the student has already been graded for this assignment
        const existingGrade = assignment.grades.find(g => g.student.toString() === studentId);
        if (existingGrade) {
            existingGrade.grade = grade;
        } else {
            assignment.grades.push({ student: studentId, grade });
        }

        // Save the assignment with the new grade
        const updatedAssignment = await assignment.save();
        res.status(200).json(updatedAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error grading assignment', error });
    }
};

// Function to get grades for a specific assignment
const getAssignmentGrades = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // Find the assignment by ID and populate the grades
        const assignment = await Assignment.findById(assignmentId).populate('grades.student', 'name rollNum');
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        res.status(200).json(assignment.grades);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assignment grades', error });
    }
};

// Function to get grades for a specific student
const getStudentGrades = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Find all assignments and filter grades for the specific student
        const assignments = await Assignment.find({ 'grades.student': studentId }).populate('grades.student', 'name rollNum');
        const studentGrades = assignments.map(assignment => {
            const grade = assignment.grades.find(g => g.student.toString() === studentId);
            return {
                assignmentId: assignment._id,
                assignmentTitle: assignment.title,
                grade: grade.grade
            };
        });

        res.status(200).json(studentGrades);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student grades', error });
    }
};

// Export the functions
module.exports = {
    gradeAssignment,
    getAssignmentGrades,
    getStudentGrades
};