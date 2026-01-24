const express = require('express');
const { subscribeNewsletter } = require('../controllers/newsletter.controller');
const validate = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/newsletter
// @desc    Subscribe to newsletter
// @access  Public
router.post('/', validate.newsletterValidation, subscribeNewsletter);

module.exports = router;