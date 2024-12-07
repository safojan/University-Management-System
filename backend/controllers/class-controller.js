const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');

const sclassCreate = async (req, res) => {
    try {
        const sclass = new Sclass({
            sclassName: req.body.sclassName,
            school: req.body.adminID
        });

        const existingSclassByName = await Sclass.findOne({
            sclassName: req.body.sclassName,
            school: req.body.adminID
        });

        if (existingSclassByName) {
            res.send({ message: 'Sorry this class name already exists' });
        }
        else {
            const result = await sclass.save();
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const sclassList = async (req, res) => {
    try {
        let sclasses = await Sclass.find({ school: req.params.id })
        if (sclasses.length > 0) {
            res.send(sclasses)
        } else {
            res.send({ message: "No sclasses found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSclassDetail = async (req, res) => {
    try {
        let sclass = await Sclass.findById(req.params.id);
        if (sclass) {
            sclass = await sclass.populate("school", "schoolName")
            res.send(sclass);
        }
        else {
            res.send({ message: "No class found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const getSclassStudents = async (req, res) => {
    try {
        let students = await Student.find({ sclassName: req.params.id })
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteSclass = async (req, res) => {
    try {
        const deletedClass = await Sclass.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.send({ message: "Class not found" });
        }
        const deletedStudents = await Student.deleteMany({ sclassName: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ teachSclass: req.params.id });
        res.send(deletedClass);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteSclasses = async (req, res) => {
    try {
        const deletedClasses = await Sclass.deleteMany({ school: req.params.id });
        if (deletedClasses.deletedCount === 0) {
            return res.send({ message: "No classes found to delete" });
        }
        const deletedStudents = await Student.deleteMany({ school: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ school: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ school: req.params.id });
        res.send(deletedClasses);
    } catch (error) {
        res.status(500).json(error);
    }
}


const sGetClassSubjectAttendance = async (req, res) => {
    try {
        // Get class ID and subject ID from the request parameters
        const { classId, subjectId } = req.params;

        // Find the class by ID to ensure the class exists
        const sclass = await Sclass.findById(classId);
        if (!sclass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Find the subject by ID to ensure the subject exists
        const subject = await Subject.findById(subjectId).populate('sclassName', 'sclassName').exec();
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        // Find all students in the class and filter attendance records for the specific subject
        const students = await Student.find({ sclassName: classId })
            .populate('attendance.subName', 'subName')
            .exec();

        // Filter attendance data for the specific subject
        const attendanceData = students.map(student => {
            const filteredAttendance = student.attendance.filter(record => {
                // Filter by subject
                return record.subName && record.subName._id.toString() === subjectId;
            });

            return {
                studentName: student.name,
                rollNum: student.rollNum,
                attendance: filteredAttendance.map(record => ({
                    date: record.date,
                    status: record.status,
                    subject: record.subName ? record.subName.subName : 'Unknown'
                }))
            };
        });

        // Send the attendance data in response
        return res.status(200).json({
            className: sclass.sclassName,
            subject: subject.subName,
            attendanceData
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
const TodaysClassAttandance = async (req, res) => {
    try {
        const { classId, subjectId } = req.params;
        const attendanceData = req.body;

        // Find the class by ID to ensure the class exists
        const sclass = await Sclass.findById(classId);
        if (!sclass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Find the subject by ID to ensure the subject exists
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        // Find all students in the class
        const students = await Student.find({ sclassName: classId });

        // Update attendance for each student
        for (const student of students) {
            const rollNum = student.rollNum.toString();
           
            if (attendanceData.hasOwnProperty(rollNum)) {
                const status = attendanceData[rollNum];
                const date = new Date().toISOString().split('T')[0]; // Get only the date part

                const existingAttendance = student.attendance.find(
                    (a) =>
                        a.date.toISOString().split('T')[0] === date &&
                        a.subName.toString() === subjectId
                );

                if (existingAttendance) {
                    existingAttendance.status = status;
                } else {
                    student.attendance.push({ date, status, subName: subjectId });
                }
            }
            await student.save();
        }

        // Send the updated attendance data back in response
        const updatedStudents = await Student.find({ sclassName: classId })
            .populate('attendance.subName', 'subName')
            .exec();

        const updatedAttendanceData = updatedStudents.map(student => {
            const filteredAttendance = student.attendance.filter(record => {
                return record.subName && record.subName._id.toString() === subjectId;
            });

            return {
                studentName: student.name,
                rollNum: student.rollNum,
                attendance: filteredAttendance.map(record => ({
                    date: record.date,
                    status: record.status,
                    subject: record.subName ? record.subName.subName : 'Unknown'
                }))
            };
        });

        return res.status(200).json({
            updatedAttendanceData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


module.exports = { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents,sGetClassSubjectAttendance ,TodaysClassAttandance};