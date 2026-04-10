const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

let applications = [];
let nextAppId = 1;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get('/applications', (req, res) => {
  const sorted = [...applications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, data: sorted });
});

router.post('/apply', upload.single('resume'), (req, res) => {
  const { name, email, phone, role, coverLetter } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ success: false, message: 'Name, email, and role are required' });
  }

  const application = {
    _id: String(nextAppId++),
    name,
    email,
    phone: phone || '',
    role,
    coverLetter: coverLetter || '',
    resume: req.file ? req.file.filename : null,
    status: 'new',
    createdAt: new Date()
  };

  applications.push(application);
  res.status(201).json({ success: true, data: application });
});

router.put('/applications/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const appIndex = applications.findIndex(a => a._id === id);
  
  if (appIndex === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  const validStatuses = ['new', 'reviewing', 'interview', 'rejected', 'accepted'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  applications[appIndex].status = status;
  res.json({ success: true, data: applications[appIndex] });
});

router.delete('/applications/:id', (req, res) => {
  const { id } = req.params;
  const appIndex = applications.findIndex(a => a._id === id);
  
  if (appIndex === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  applications.splice(appIndex, 1);
  res.json({ success: true, message: 'Application deleted successfully' });
});

module.exports = router;
