const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { requireAdminAuth } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
  }
});

router.get('/all', requireAdminAuth, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
  }
});

router.post('/', requireAdminAuth, async (req, res) => {
  try {
    const { title, type, location, description, requirements, salary } = req.body;

    if (!title || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and description are required' 
      });
    }

    const job = await Job.create({
      title,
      type: type || 'Full-time',
      location: location || 'Remote',
      description,
      requirements: Array.isArray(requirements) ? requirements : [],
      salary: salary || ''
    });

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create job' });
  }
});

router.put('/:id', requireAdminAuth, async (req, res) => {
  try {
    const { title, type, location, description, requirements, salary, isActive } = req.body;

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (title) job.title = title;
    if (type) job.type = type;
    if (location) job.location = location;
    if (description) job.description = description;
    if (requirements) job.requirements = Array.isArray(requirements) ? requirements : [];
    if (salary !== undefined) job.salary = salary;
    if (isActive !== undefined) job.isActive = isActive;

    await job.save();
    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update job' });
  }
});

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete job' });
  }
});

module.exports = router;
