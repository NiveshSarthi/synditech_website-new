const Newsletter = require('../models/Newsletter');
const sendEmail = require('../utils/emailService');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    // Save to database
    const subscriber = await Newsletter.create({ email });

    // Send welcome email
    await sendEmail({
      to: email,
      subject: 'Welcome to Synditech Newsletter',
      html: `
        <h2>Welcome to Synditech!</h2>
        <p>Thank you for subscribing to our newsletter. You'll be the first to know about our latest services, tools, and updates.</p>
        <p>Best regards,<br>The Synditech Team</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscriber,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  subscribeNewsletter,
};