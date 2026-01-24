// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Models
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  budget: String,
  company: String,
  status: { type: String, enum: ['new', 'qualified', 'converted', 'lost'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

const NewsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  subscribed: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);
const Lead = mongoose.model('Lead', LeadSchema);
const Newsletter = mongoose.model('Newsletter', NewsletterSchema);

// Email Configuration
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Synditech Server is running',
    timestamp: new Date().toISOString()
  });
});

// Contact Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Save to database
    const contact = new Contact({ name, email, phone, message });
    await contact.save();

    // Send email notification to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission - Synditech',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
          <p style="color: #666; margin-top: 20px;">Received at: ${new Date().toLocaleString()}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Synditech',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>We have received your message and will get back to you shortly.</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p>${message}</p>
          </div>
          <p>Best regards,<br><strong>Synditech Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(userMailOptions);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. Check your email for confirmation.',
      data: contact
    });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: error.message
    });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message
    });
  }
});

// Lead Routes
app.post('/api/leads', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ 
      success: true, 
      message: 'Lead created successfully',
      data: lead 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create lead',
      error: error.message 
    });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ 
      success: true,
      count: leads.length,
      data: leads 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch leads',
      error: error.message 
    });
  }
});

// Newsletter Routes
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const newsletter = new Newsletter({ email });
    await newsletter.save();

    // Send welcome email
    const welcomeEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Synditech Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">Welcome to Synditech!</h2>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You'll receive updates about our latest services, tools, and technology insights.</p>
          <p>Stay tuned!</p>
          <p>Best regards,<br><strong>Synditech Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(welcomeEmail);

    res.status(201).json({ 
      success: true, 
      message: 'Subscribed successfully! Check your email.' 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already subscribed' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe',
      error: error.message 
    });
  }
});

app.get('/api/newsletter', async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ subscribed: true }).sort({ subscribedAt: -1 });
    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers',
      error: error.message
    });
  }
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Synditech Server running on port ${PORT}`);
  console.log(`📧 Email service configured with: ${process.env.EMAIL_USER}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
});