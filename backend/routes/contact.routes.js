const express = require('express');
const {
  submitContact,
  getAllContacts,
  deleteContact,
  updateContactStatus,
} = require('../controllers/contact.controller');
const validate = require('../middleware/validation');
const { requireAdminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', validate.contactValidation, submitContact);
router.get('/', requireAdminAuth, getAllContacts);
router.delete('/:id', requireAdminAuth, deleteContact);
router.patch('/:id/status', requireAdminAuth, updateContactStatus);

module.exports = router;
