const express = require('express');
const { submitContact, getAllContacts } = require('../controllers/contact.controller');
const validate = require('../middleware/validation');
const { requireAdminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', validate.contactValidation, submitContact);

// @route   GET /api/contact
// @desc    Get all contacts
// @access  Private/Admin
router.get('/', requireAdminAuth, getAllContacts);

module.exports = router;
