const ScholarshipApplication = require('../models/scholarshipApplicationSchema');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.submitApplication = upload.array('documents', 5), async (req, res) => {
  try {
    const { studentID, scholarshipType } = req.body;
    const documentFiles = req.files.map(file => file.filename);

    const newApplication = new ScholarshipApplication({
      studentID,
      scholarshipType,
      documents: documentFiles
    });
    
    await newApplication.save();
    res.status(201).send({ message: 'Application submitted successfully with documents' });
  } catch (error) {
    res.status(500).send({ message: 'Error submitting application' });
  }
};


exports.getApplications = async (req, res) => {
  try {
    const applications = await ScholarshipApplication.find({ studentID: req.params.studentID });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching applications' });
  }
};
