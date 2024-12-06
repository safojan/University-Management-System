const Syllabus = require('../models/syllabusSchema.js'); // Assuming you have a Syllabus model

// Function to upload a new syllabus
const uploadSyllabus = async (req, res) => {
    try {
        const { courseId, content } = req.body;

        // Create a new syllabus
        const newSyllabus = new Syllabus({
            courseId,
            content
        });

        // Save the syllabus to the database
        const savedSyllabus = await newSyllabus.save();
        res.status(201).json(savedSyllabus);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading syllabus', error });
    }
};

// Function to update an existing syllabus
const updateSyllabus = async (req, res) => {
    try {
        const { syllabusId } = req.params;
        const { content } = req.body;

        // Find the syllabus by ID and update it
        const updatedSyllabus = await Syllabus.findByIdAndUpdate(
            syllabusId,
            { content },
            { new: true }
        );

        if (!updatedSyllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }

        res.status(200).json(updatedSyllabus);
    } catch (error) {
        res.status(500).json({ message: 'Error updating syllabus', error });
    }
};

// Function to get a syllabus by ID
const getSyllabus = async (req, res) => {
    try {
        const { syllabusId } = req.params;

        // Find the syllabus by ID
        const syllabus = await Syllabus.findById(syllabusId);

        if (!syllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }

        res.status(200).json(syllabus);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching syllabus', error });
    }
};

// Function to delete a syllabus by ID
const deleteSyllabus = async (req, res) => {
    try {
        const { syllabusId } = req.params;

        // Find the syllabus by ID and delete it
        const deletedSyllabus = await Syllabus.findByIdAndDelete(syllabusId);

        if (!deletedSyllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }

        res.status(200).json({ message: 'Syllabus deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting syllabus', error });
    }
};

// Export the functions
module.exports = {
    uploadSyllabus,
    updateSyllabus,
    getSyllabus,
    deleteSyllabus
};