const express = require('express');
const { createLead, getAllLeads } = require('../controllers/lead.controller');
const validate = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/leads
// @desc    Create a lead
// @access  Public
router.post('/', validate.leadValidation, createLead);

// @route   GET /api/leads
// @desc    Get all leads
// @access  Private/Admin
router.get('/', getAllLeads);

module.exports = router;