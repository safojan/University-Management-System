const express = require('express');
const { sendMessageToParent, getMessagesForParent, getMessagesForStudent } = require('../controllers/communicationController.js');
const router = express.Router();

// Route to send a message to a specific parent
router.post('/sendMessage/:parentId', sendMessageToParent);

// Route to get all messages for a specific parent
router.get('/messages/parent/:parentId', getMessagesForParent);

// Route to get all messages for a specific student
router.get('/messages/student/:studentId', getMessagesForStudent);

module.exports = router;