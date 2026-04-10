const express = require('express');
const {
  submitContact,
  getAllContacts,
  deleteContact,
  updateContactStatus,
} = require('../controllers/contact.controller');
const validate = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', validate.contactValidation, submitContact);

// @route   GET /api/contact
// @desc    Get all contacts (latest first)
// @access  Private/Admin
router.get('/', getAllContacts);

// @route   DELETE /api/contact/:id
// @desc    Delete a contact
// @access  Private/Admin
router.delete('/:id', deleteContact);

// @route   PATCH /api/contact/:id/status
// @desc    Mark contact as read or unread
// @access  Private/Admin
router.patch('/:id/status', updateContactStatus);

module.exports = router;