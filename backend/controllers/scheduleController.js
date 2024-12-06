const Schedule = require('../models/scheduleSchema.js'); // Assuming you have a Schedule model

// Function to create a new schedule
const createSchedule = async (req, res) => {
    try {
        const { courseId, timetable } = req.body;

        // Create a new schedule
        const newSchedule = new Schedule({
            courseId,
            timetable
        });

        // Save the schedule to the database
        const savedSchedule = await newSchedule.save();
        res.status(201).json(savedSchedule);
    } catch (error) {
        res.status(500).json({ message: 'Error creating schedule', error });
    }
};

// Function to update an existing schedule
const updateSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const { timetable } = req.body;

        // Find the schedule by ID and update it
        const updatedSchedule = await Schedule.findByIdAndUpdate(
            scheduleId,
            { timetable },
            { new: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json(updatedSchedule);
    } catch (error) {
        res.status(500).json({ message: 'Error updating schedule', error });
    }
};

// Function to get a schedule by ID
const getSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;

        // Find the schedule by ID
        const schedule = await Schedule.findById(scheduleId);

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule', error });
    }
};

// Function to delete a schedule by ID
const deleteSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;

        // Find the schedule by ID and delete it
        const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);

        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting schedule', error });
    }
};

// Export the functions
module.exports = {
    createSchedule,
    updateSchedule,
    getSchedule,
    deleteSchedule
};