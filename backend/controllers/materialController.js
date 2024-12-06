const Material = require('../models/materialSchema.js'); // Assuming you have a Material model

// Function to upload a new study material
const uploadMaterial = async (req, res) => {
    try {
        const { courseId, title, description, fileUrl } = req.body;

        // Create a new study material
        const newMaterial = new Material({
            courseId,
            title,
            description,
            fileUrl
        });

        // Save the study material to the database
        const savedMaterial = await newMaterial.save();
        res.status(201).json(savedMaterial);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading study material', error });
    }
};

// Function to update an existing study material
const updateMaterial = async (req, res) => {
    try {
        const { materialId } = req.params;
        const { title, description, fileUrl } = req.body;

        // Find the study material by ID and update it
        const updatedMaterial = await Material.findByIdAndUpdate(
            materialId,
            { title, description, fileUrl },
            { new: true }
        );

        if (!updatedMaterial) {
            return res.status(404).json({ message: 'Study material not found' });
        }

        res.status(200).json(updatedMaterial);
    } catch (error) {
        res.status(500).json({ message: 'Error updating study material', error });
    }
};

// Function to get a study material by ID
const getMaterial = async (req, res) => {
    try {
        const { materialId } = req.params;

        // Find the study material by ID
        const material = await Material.findById(materialId);

        if (!material) {
            return res.status(404).json({ message: 'Study material not found' });
        }

        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching study material', error });
    }
};

// Function to delete a study material by ID
const deleteMaterial = async (req, res) => {
    try {
        const { materialId } = req.params;

        // Find the study material by ID and delete it
        const deletedMaterial = await Material.findByIdAndDelete(materialId);

        if (!deletedMaterial) {
            return res.status(404).json({ message: 'Study material not found' });
        }

        res.status(200).json({ message: 'Study material deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting study material', error });
    }
};

// Export the functions
module.exports = {
    uploadMaterial,
    updateMaterial,
    getMaterial,
    deleteMaterial
};