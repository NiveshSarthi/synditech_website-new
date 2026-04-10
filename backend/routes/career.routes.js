const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const CareerApplication = require('../models/CareerApplication');
const { requireAdminAuth } = require('../middleware/auth');
const sendEmail = require('../utils/emailService');

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

router.get('/applications', requireAdminAuth, async (req, res) => {
  try {
    const applications = await CareerApplication.find().sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
});

router.post('/apply', upload.single('resume'), async (req, res) => {
  const { name, email, phone, role, coverLetter } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ success: false, message: 'Name, email, and role are required' });
  }

  try {
    const application = await CareerApplication.create({
      name,
      email,
      phone: phone || '',
      role,
      coverLetter: coverLetter || '',
      resume: req.file ? req.file.filename : null,
    });

    const resumeUrl = application.resume
      ? `${process.env.SERVER_PUBLIC_URL || 'http://localhost:5000'}/api/uploads/${application.resume}`
      : '';

    await sendEmail({
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Career Application: ${name} - ${role}`,
      html: `
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Cover Letter:</strong></p>
        <p>${coverLetter || 'Not provided'}</p>
        ${resumeUrl ? `<p><strong>Resume:</strong> <a href="${resumeUrl}">Download resume</a></p>` : '<p><strong>Resume:</strong> Not uploaded</p>'}
      `,
    });

    await sendEmail({
      to: email,
      subject: `Application received for ${role} at Synditech`,
      html: `
        <h2>Thank you for applying to Synditech</h2>
        <p>Hi ${name},</p>
        <p>We have received your application for the <strong>${role}</strong> role.</p>
        <p>Our team will review your resume and details. If your profile matches the role requirements, we will contact you with the next steps.</p>
        <p><strong>Application summary</strong></p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p>Best regards,<br>The Synditech Team</p>
      `,
    });

    res.status(201).json({ success: true, message: 'Application submitted successfully.', data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to submit application' });
  }
});

router.put('/applications/:id/status', requireAdminAuth, async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['new', 'reviewing', 'interview', 'rejected', 'accepted'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  try {
    const application = await CareerApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update application status' });
  }
});

router.delete('/applications/:id', requireAdminAuth, async (req, res) => {
  try {
    const application = await CareerApplication.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.resume) {
      const filePath = path.join(__dirname, '../uploads', application.resume);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete application' });
  }
});

module.exports = router;
