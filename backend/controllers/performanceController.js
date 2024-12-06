const Assignment = require('../models/assignmentSchema.js'); // Assuming you have an Assignment model
const Quiz = require('../models/quizSchema.js'); // Assuming you have a Quiz model
const Student = require('../models/studentSchema.js');

// Function to get progress for a specific student
const getStudentProgress = async (req, res) => {
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

        // Calculate average grades
        const averageAssignmentGrade = assignmentCount ? (totalAssignmentGrades / assignmentCount) : 0;
        const averageQuizGrade = quizCount ? (totalQuizGrades / quizCount) : 0;

        res.status(200).json({
            studentName: student.name,
            rollNum: student.rollNum,
            averageAssignmentGrade: averageAssignmentGrade.toFixed(2),
            averageQuizGrade: averageQuizGrade.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student progress', error });
    }
};

// Function to get progress for a specific class
const getClassProgress = async (req, res) => {
    try {
        const { classId } = req.params;

        // Find students by class ID
        const students = await Student.find({ class: classId });

        // Calculate progress for each student
        const progress = await Promise.all(students.map(async student => {
            const assignments = await Assignment.find({ 'grades.student': student._id }).populate('grades.student', 'name rollNum');
            const quizzes = await Quiz.find({ 'results.student': student._id }).populate('results.student', 'name rollNum');

            let totalAssignmentGrades = 0;
            let totalQuizGrades = 0;
            let assignmentCount = 0;
            let quizCount = 0;

            assignments.forEach(assignment => {
                const grade = assignment.grades.find(g => g.student.toString() === student._id.toString());
                if (grade) {
                    totalAssignmentGrades += grade.grade;
                    assignmentCount++;
                }
            });

            quizzes.forEach(quiz => {
                const result = quiz.results.find(r => r.student.toString() === student._id.toString());
                if (result) {
                    totalQuizGrades += result.score;
                    quizCount++;
                }
            });

            const averageAssignmentGrade = assignmentCount ? (totalAssignmentGrades / assignmentCount) : 0;
            const averageQuizGrade = quizCount ? (totalQuizGrades / quizCount) : 0;

            return {
                studentName: student.name,
                rollNum: student.rollNum,
                averageAssignmentGrade: averageAssignmentGrade.toFixed(2),
                averageQuizGrade: averageQuizGrade.toFixed(2)
            };
        }));

        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching class progress', error });
    }
};

// Function to get progress for the entire school
const getSchoolProgress = async (req, res) => {
    try {
        const { schoolId } = req.params;

        // Find students by school ID
        const students = await Student.find({ school: schoolId });

        // Calculate progress for each student
        const progress = await Promise.all(students.map(async student => {
            const assignments = await Assignment.find({ 'grades.student': student._id }).populate('grades.student', 'name rollNum');
            const quizzes = await Quiz.find({ 'results.student': student._id }).populate('results.student', 'name rollNum');

            let totalAssignmentGrades = 0;
            let totalQuizGrades = 0;
            let assignmentCount = 0;
            let quizCount = 0;

            assignments.forEach(assignment => {
                const grade = assignment.grades.find(g => g.student.toString() === student._id.toString());
                if (grade) {
                    totalAssignmentGrades += grade.grade;
                    assignmentCount++;
                }
            });

            quizzes.forEach(quiz => {
                const result = quiz.results.find(r => r.student.toString() === student._id.toString());
                if (result) {
                    totalQuizGrades += result.score;
                    quizCount++;
                }
            });

            const averageAssignmentGrade = assignmentCount ? (totalAssignmentGrades / assignmentCount) : 0;
            const averageQuizGrade = quizCount ? (totalQuizGrades / quizCount) : 0;

            return {
                studentName: student.name,
                rollNum: student.rollNum,
                averageAssignmentGrade: averageAssignmentGrade.toFixed(2),
                averageQuizGrade: averageQuizGrade.toFixed(2)
            };
        }));

        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching school progress', error });
    }
};

// Export the functions
module.exports = {
    getStudentProgress,
    getClassProgress,
    getSchoolProgress
};