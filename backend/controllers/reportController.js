const Attendance = require('../models/attendanceSchema.js'); // Assuming you have an Attendance model
const Student = require('../models/studentSchema.js');
const Class = require('../models/classSchema.js');

// Function to generate attendance report for a class
const generateClassAttendanceReport = async (req, res) => {
    try {
        const { classId } = req.params;

        // Find students by class ID
        const students = await Student.find({ class: classId });

        // Find attendance records for the students in the class
        const attendanceRecords = await Attendance.find({ student: { $in: students.map(student => student._id) } }).populate('student', 'name rollNum');

        // Group attendance records by student
        const report = students.map(student => {
            const studentAttendance = attendanceRecords.filter(record => record.student._id.toString() === student._id.toString());
            const presentCount = studentAttendance.filter(record => record.status === 'Present').length;
            const totalSessions = studentAttendance.length;
            const attendancePercentage = totalSessions ? (presentCount / totalSessions) * 100 : 0;

            return {
                studentName: student.name,
                rollNum: student.rollNum,
                presentCount,
                totalSessions,
                attendancePercentage: attendancePercentage.toFixed(2)
            };
        });

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating class attendance report', error });
    }
};

// Function to generate attendance report for a student
const generateStudentAttendanceReport = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find attendance records by student ID
        const attendanceRecords = await Attendance.find({ student: studentId }).populate('student', 'name rollNum');

        const presentCount = attendanceRecords.filter(record => record.status === 'Present').length;
        const totalSessions = attendanceRecords.length;
        const attendancePercentage = totalSessions ? (presentCount / totalSessions) * 100 : 0;

        const report = {
            studentName: attendanceRecords[0]?.student.name,
            rollNum: attendanceRecords[0]?.student.rollNum,
            presentCount,
            totalSessions,
            attendancePercentage: attendancePercentage.toFixed(2)
        };

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating student attendance report', error });
    }
};

// Function to generate overall attendance report for the school
const generateOverallAttendanceReport = async (req, res) => {
    try {
        const { schoolId } = req.params;

        // Find students by school ID
        const students = await Student.find({ school: schoolId });

        // Find attendance records for the students in the school
        const attendanceRecords = await Attendance.find({ student: { $in: students.map(student => student._id) } }).populate('student', 'name rollNum');

        // Group attendance records by student
        const report = students.map(student => {
            const studentAttendance = attendanceRecords.filter(record => record.student._id.toString() === student._id.toString());
            const presentCount = studentAttendance.filter(record => record.status === 'Present').length;
            const totalSessions = studentAttendance.length;
            const attendancePercentage = totalSessions ? (presentCount / totalSessions) * 100 : 0;

            return {
                studentName: student.name,
                rollNum: student.rollNum,
                presentCount,
                totalSessions,
                attendancePercentage: attendancePercentage.toFixed(2)
            };
        });

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating overall attendance report', error });
    }
};

// Export the functions
module.exports = {
    generateClassAttendanceReport,
    generateStudentAttendanceReport,
    generateOverallAttendanceReport
};