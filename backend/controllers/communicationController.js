const Parent = require('../models/parentSchema.js'); // Assuming you have a Parent model
const Student = require('../models/studentSchema.js'); // Assuming you have a Student model

// Function to send a message to a specific parent
const sendMessageToParent = async (req, res) => {
    try {
        const { parentId } = req.params;
        const { message } = req.body;

        // Find the parent by ID
        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }

        // Add the message to the parent's messages array
        parent.messages.push({ message, date: new Date() });
        await parent.save();

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
};

// Function to get all messages for a specific parent
const getMessagesForParent = async (req, res) => {
    try {
        const { parentId } = req.params;

        // Find the parent by ID
        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }

        res.status(200).json(parent.messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

// Function to get all messages for a specific student
const getMessagesForStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find the student by ID
        const student = await Student.findById(studentId).populate('parent');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const parent = student.parent;
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }

        res.status(200).json(parent.messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

// Export the functions
module.exports = {
    sendMessageToParent,
    getMessagesForParent,
    getMessagesForStudent
};