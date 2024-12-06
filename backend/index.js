const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/route.js")
<<<<<<< HEAD
// Import existing routes
const analyticsRoutes = require('./routes/analyticsRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const courseRoutes = require('./routes/courseRoutes');
const gradesRoutes = require('./routes/gradesRoutes');
const gradingRoutes = require('./routes/gradingRoutes');
const materialRoutes = require('./routes/materialRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const progressReportRoutes = require('./routes/progressReportRoutes');
const reportRoutes = require('./routes/reportRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const syllabusRoutes = require('./routes/syllabusRoutes');
const communicationRoutes = require('./routes/communicationRoutes');
const quizRoutes = require('./routes/quizRoutes');
const quizAssessmentRoutes = require('./routes/quizAssessmentRoutes');
=======
>>>>>>> c7bf637b2847ecdae0bebf3962bd1b69c26c6d2e

const PORT = 3000;

dotenv.config();

app.use((req, res, next) => {
  console.log({ method: req.method, path: req.url });
  next();
});


// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))
app.use(cors())

mongoose
<<<<<<< HEAD
    .connect(process.env.MONGODB_URI)
=======
    .connect(process.env.MONGO_URL)
>>>>>>> c7bf637b2847ecdae0bebf3962bd1b69c26c6d2e
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))




app.use('/', Routes);
<<<<<<< HEAD
// Use existing routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/grades', gradesRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/progressReports', progressReportRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/assignment', assignmentRoutes);
app.use('/api/communication', communicationRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/quizAssessment', quizAssessmentRoutes);
app.use('/api/grading', gradingRoutes);
=======
>>>>>>> c7bf637b2847ecdae0bebf3962bd1b69c26c6d2e



app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})