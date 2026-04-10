// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage
let contacts = [];
let leads = [];
let newsletters = [];
let nextContactId = 1;
let nextLeadId = 1;
let nextNewsletterId = 1;

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    const contact = {
      _id: String(nextContactId++),
      name,
      email,
      phone: phone || '',
      message,
      status: 'new',
      createdAt: new Date()
    };

    contacts.push(contact);

    // Try to send email notification
    try {
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
    } catch (emailError) {
      console.log('Email notification skipped:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully.',
      data: contact
    });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form'
    });
  }
});

app.get('/api/contact', async (req, res) => {
  res.json({
    success: true,
    count: contacts.length,
    data: contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  });
});

// Lead Routes
app.post('/api/leads', async (req, res) => {
  console.log("New Lead Request Received:", req.body);
  try {
    const { service, name, email, phone, budget, timeline } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    const lead = {
      _id: String(nextLeadId++),
      service: service || '',
      name,
      email,
      phone: phone || '',
      budget: budget || '',
      timeline: timeline || '',
      status: 'new',
      createdAt: new Date()
    };

    leads.push(lead);
    console.log("Lead Saved Successfully:", lead);

    res.status(201).json({ 
      success: true, 
      message: 'Lead created successfully',
      data: lead 
    });
  } catch (error) {
    console.error("Failed to create lead:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create lead'
    });
  }
});

app.get('/api/leads', async (req, res) => {
  res.json({ 
    success: true,
    count: leads.length,
    data: leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  });
});

app.delete('/api/leads/:id', async (req, res) => {
  const index = leads.findIndex(l => l._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ 
      success: false, 
      message: 'Lead not found' 
    });
  }
  leads.splice(index, 1);
  res.json({ 
    success: true, 
    message: 'Lead deleted successfully' 
  });
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

    if (newsletters.find(n => n.email === email.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Email already subscribed'
      });
    }

    const newsletter = {
      _id: String(nextNewsletterId++),
      email: email.toLowerCase(),
      subscribed: true,
      subscribedAt: new Date()
    };

    newsletters.push(newsletter);

    res.status(201).json({ 
      success: true, 
      message: 'Subscribed successfully!' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe'
    });
  }
});

app.get('/api/newsletter', async (req, res) => {
  res.json({
    success: true,
    count: newsletters.length,
    data: newsletters.filter(n => n.subscribed).sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt))
  });
});

// Blog Routes
const blogRoutes = require('./routes/blog.routes');
app.use('/api/blogs', blogRoutes);

// Career/Resume Routes
const careerRoutes = require('./routes/career.routes');
app.use('/api/careers', careerRoutes);

// Admin Routes
const adminRoutes = require('./routes/admin.routes');
app.use('/api/admin', adminRoutes);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
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
});
