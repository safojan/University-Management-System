const Assignment = require('../models/assignmentSchema.js'); // Assuming you have an Assignment model

// Function to create a new assignment
const createAssignment = async (req, res) => {
    try {
        const { courseId, title, description, dueDate } = req.body;

        // Create a new assignment
        const newAssignment = new Assignment({
            courseId,
            title,
            description,
            dueDate
        });

        // Save the assignment to the database
        const savedAssignment = await newAssignment.save();
        res.status(201).json(savedAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating assignment', error });
    }
};

// Function to update an existing assignment
const updateAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const { title, description, dueDate } = req.body;

        // Find the assignment by ID and update it
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            assignmentId,
            { title, description, dueDate },
            { new: true }
        );

        if (!updatedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        res.status(200).json(updatedAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating assignment', error });
    }
};

// Function to get an assignment by ID
const getAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // Find the assignment by ID
        const assignment = await Assignment.findById(assignmentId);

        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assignment', error });
    }
};

// Function to delete an assignment by ID
const deleteAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // Find the assignment by ID and delete it
        const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);

        if (!deletedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting assignment', error });
    }
};
const markAsDone = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // Find the assignment by ID and update the status to 'done'
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            assignmentId,
            { status: 'done' },
            { new: true }
        );

        if (!updatedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        res.status(200).json(updatedAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error marking assignment as done', error });
    }
};
// Function to get all assignments
const getAllAssignments = async (req, res) => {
    try {
        // Fetch all assignments from the database
        const assignments = await Assignment.find();

        if (!assignments || assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found' });
        }

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assignments', error });
    }
};

const submitAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const { studentId } = req.body; // Assuming studentId is passed in the request body
        const fileUrl = req.file.path; // Assuming you're using `multer` for file uploads

        // Find the assignment and add the submission
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        assignment.submissions.push({ studentId, fileUrl });
        await assignment.save();

        res.status(200).json({ message: 'File uploaded successfully', assignment });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting assignment', error });
    }
};

// Export the functions
module.exports = {
    createAssignment,
    updateAssignment,
    getAssignment,
    deleteAssignment,
    getAllAssignments,
    submitAssignment, // Add the new function here
    markAsDone // Add the new function here
};