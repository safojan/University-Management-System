const express = require('express');
const { createSchedule, updateSchedule, getSchedule, deleteSchedule } = require('../controllers/scheduleController.js');
const router = express.Router();

// Route to create a new schedule
router.post('/createSchedule', createSchedule);

// Route to update an existing schedule
router.put('/updateSchedule/:scheduleId', updateSchedule);

// Route to get a schedule by ID
router.get('/getSchedule/:scheduleId', getSchedule);

// Route to delete a schedule by ID
router.delete('/deleteSchedule/:scheduleId', deleteSchedule);

module.exports = router;