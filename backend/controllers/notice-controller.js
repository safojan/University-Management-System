const Notice = require('../models/noticeSchema.js');
const mg = require('../emailConfig.js');
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');

const noticeCreate = async (req, res) => {
    try {
        const notice = new Notice({
            ...req.body,
            school: req.body.adminID
        });

        const result = await notice.save();

        // Fetch all teachers and students email addresses
        const teachers = await Teacher.find({}, 'email');
        const students = await Student.find({}, 'email');

        const emailList = [...teachers, ...students].map(user => user.email);

        // Email content
        const mailOptions = {
            from: 'jsafdar199@gmail.com', // Use your Gmail email address
            to: ["i228804@nu.edu.pk"],
            subject: 'New Notification Posted',
            text: `A new notification has been posted: ${notice.content}`,
            html: `<h1>A new notification has been posted:</h1><p>${notice.content}</p>`
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });

        console.log("i am here");

        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const noticeList = async (req, res) => {
    try {
        let notices = await Notice.find({ school: req.params.id })
        if (notices.length > 0) {
            res.send(notices)
        } else {
            res.send({ message: "No notices found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateNotice = async (req, res) => {
    try {
        const result = await Notice.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteNotice = async (req, res) => {
    try {
        const result = await Notice.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteNotices = async (req, res) => {
    try {
        const result = await Notice.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No notices found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

module.exports = { noticeCreate, noticeList, updateNotice, deleteNotice, deleteNotices };