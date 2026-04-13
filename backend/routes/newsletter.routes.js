const express = require('express');
const { subscribeNewsletter } = require('../controllers/newsletter.controller');
const validate = require('../middleware/validation');
const Newsletter = require('../models/Newsletter');
const { requireAdminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/newsletter
// @desc    Subscribe to newsletter
// @access  Public
router.post('/', validate.newsletterValidation, subscribeNewsletter);

// @route   GET /api/newsletter/subscribers
// @desc    Get all newsletter subscribers (Admin)
// @access  Admin
router.get('/subscribers', requireAdminAuth, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers' });
  }
});

// @route   DELETE /api/newsletter/subscribers/:id
// @desc    Remove a newsletter subscriber (Admin)
// @access  Admin
router.delete('/subscribers/:id', requireAdminAuth, async (req, res) => {
  try {
    const deleted = await Newsletter.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }
    res.json({ success: true, message: 'Subscriber removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove subscriber' });
  }
});

module.exports = router;