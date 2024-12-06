const Assignment = require('../models/assignmentSchema.js'); // Assuming you have an Assignment model
const Quiz = require('../models/quizSchema.js'); // Assuming you have a Quiz model
const Student = require('../models/studentSchema.js');

// Function to calculate final grades for a student
const calculateFinalGrades = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Find all assignments and quizzes for the student
        const assignments = await Assignment.find({ 'grades.student': studentId }).populate('grades.student', 'name rollNum');
        const quizzes = await Quiz.find({ 'results.student': studentId }).populate('results.student', 'name rollNum');

        // Calculate total grades for assignments and quizzes
        let totalAssignmentGrades = 0;
        let totalQuizGrades = 0;
        let assignmentCount = 0;
        let quizCount = 0;

        assignments.forEach(assignment => {
            const grade = assignment.grades.find(g => g.student.toString() === studentId);
            if (grade) {
                totalAssignmentGrades += grade.grade;
                assignmentCount++;
            }
        });

        quizzes.forEach(quiz => {
            const result = quiz.results.find(r => r.student.toString() === studentId);
            if (result) {
                totalQuizGrades += result.score;
                quizCount++;
            }
        });

        // Calculate final grade
        const finalGrade = ((totalAssignmentGrades / assignmentCount) + (totalQuizGrades / quizCount)) / 2;

        // Save the final grade to the student's record
        student.finalGrade = finalGrade.toFixed(2);
        await student.save();

        res.status(200).json({ message: 'Final grade calculated successfully', finalGrade: student.finalGrade });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating final grade', error });
    }
};

// Function to get final grades for a specific student
const getFinalGrades = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ finalGrade: student.finalGrade });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching final grade', error });
    }
};

// Function to get final grades for a specific class
const getClassFinalGrades = async (req, res) => {
    try {
        const { classId } = req.params;

        // Find students by class ID
        const students = await Student.find({ class: classId });

        // Get final grades for each student
        const finalGrades = students.map(student => ({
            studentName: student.name,
            rollNum: student.rollNum,
            finalGrade: student.finalGrade
        }));

        res.status(200).json(finalGrades);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching class final grades', error });
    }
};

// Export the functions
module.exports = {
    calculateFinalGrades,
    getFinalGrades,
    getClassFinalGrades
};