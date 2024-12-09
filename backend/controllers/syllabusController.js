const mongoose = require('mongoose');
const Syllabus = require('../models/syllabusSchema');

// @desc    Get all syllabi sorted by expectedCompletionDate
// @route   GET /api/syllabus
const getAllSyllabi = async (req, res) => {
  try {
    const syllabi = await Syllabus.find().sort({ expectedCompletionDate: 1 });
    res.status(200).json(syllabi);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch syllabi', error });
  }
};

// @desc    Get a specific syllabus by ID
// @route   GET /api/syllabus/:id
const getSyllabusById = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid syllabus ID format' });
  }

  try {
    const syllabus = await Syllabus.findById(id).populate('courseId');
    if (!syllabus) {
      return res.status(404).json({ message: 'Syllabus not found' });
    }
    res.status(200).json(syllabus);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch syllabus', error });
  }
};

// @desc    Create a new syllabus
// @route   POST /api/syllabus
const createSyllabus = async (req, res) => {
  const { courseId, content, expectedCompletionDate, isContentComplete } = req.body;

  console.log(expectedCompletionDate);

  // Validate input
  if (!courseId || !content || !expectedCompletionDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!mongoose.isValidObjectId(courseId)) {
    return res.status(400).json({ message: 'Invalid course ID format' });
  }

  try {
    const newSyllabus = new Syllabus({
      courseId,
      content,
      expectedCompletionDate,
      isContentComplete: isContentComplete || false,
    });
    const savedSyllabus = await newSyllabus.save();
    res.status(201).json(savedSyllabus);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create syllabus', error });
  }
};

// @desc    Update a syllabus by ID
// @route   PUT /api/syllabus/:id
const updateSyllabus = async (req, res) => {
  const { id } = req.params;
  const { courseId, content, expectedCompletionDate, isContentComplete } = req.body;

    

  // Validate ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid syllabus ID format' });
  }

  if (courseId && !mongoose.isValidObjectId(courseId)) {
    return res.status(400).json({ message: 'Invalid course ID format' });
  }

  try {
    const updatedSyllabus = await Syllabus.findByIdAndUpdate(
      id,
      { courseId, content, expectedCompletionDate, isContentComplete },
      { new: true, runValidators: true }
    );

    if (!updatedSyllabus) {
      return res.status(404).json({ message: 'Syllabus not found' });
    }

    res.status(200).json(updatedSyllabus);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update syllabus', error });
  }
};

// @desc    Delete a syllabus by ID
// @route   DELETE /api/syllabus/:id
const deleteSyllabus = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid syllabus ID format' });
  }

  try {
    const deletedSyllabus = await Syllabus.findByIdAndDelete(id);
    if (!deletedSyllabus) {
      return res.status(404).json({ message: 'Syllabus not found' });
    }

    res.status(200).json({ message: 'Syllabus deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete syllabus', error });
  }
};

module.exports = {
  getAllSyllabi,
  getSyllabusById,
  createSyllabus,
  updateSyllabus,
  deleteSyllabus,
};
