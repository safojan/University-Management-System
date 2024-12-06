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

// Export the functions
module.exports = {
    createAssignment,
    updateAssignment,
    getAssignment,
    deleteAssignment
};