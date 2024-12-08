const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER || 'jsafdar199@gmail.com', // Use your Gmail email address
        pass: process.env.GMAIL_PASS || 'safdarkhanzada55455' // Use your Gmail password
    }
});

module.exports = transporter;
