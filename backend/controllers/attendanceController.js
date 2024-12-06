const Attendance = require('../models/attendanceSchema.js'); // Assuming you have an Attendance model
const Student = require('../models/studentSchema.js');
const Class = require('../models/classSchema.js');

// Function to track daily attendance
const trackAttendance = async (req, res) => {
    try {
        const { studentId, date, status } = req.body;

        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Check if attendance for the student on the given date already exists
        const existingAttendance = await Attendance.findOne({ student: studentId, date });
        if (existingAttendance) {
            existingAttendance.status = status;
            await existingAttendance.save();
            return res.status(200).json(existingAttendance);
        }

        // Create a new attendance record
        const newAttendance = new Attendance({
            student: studentId,
            date,
            status
        });

        // Save the attendance record to the database
        const savedAttendance = await newAttendance.save();
        res.status(201).json(savedAttendance);
    } catch (error) {
        res.status(500).json({ message: 'Error tracking attendance', error });
    }
};

// Function to get attendance by date
const getAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.params;

        // Find attendance records by date
        const attendanceRecords = await Attendance.find({ date }).populate('student', 'name rollNum');

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error });
    }
};

// Function to get attendance by student ID
const getAttendanceByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find attendance records by student ID
        const attendanceRecords = await Attendance.find({ student: studentId }).populate('student', 'name rollNum');

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error });
    }
};

// Function to get attendance by class ID
const getAttendanceByClass = async (req, res) => {
    try {
        const { classId } = req.params;

        // Find students by class ID
        const students = await Student.find({ class: classId });

        // Find attendance records for the students in the class
        const attendanceRecords = await Attendance.find({ student: { $in: students.map(student => student._id) } }).populate('student', 'name rollNum');

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error });
    }
};

// Export the functions
module.exports = {
    trackAttendance,
    getAttendanceByDate,
    getAttendanceByStudent,
    getAttendanceByClass
};