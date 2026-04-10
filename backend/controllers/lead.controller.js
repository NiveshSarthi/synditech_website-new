const Lead = require('../models/Lead');
const sendEmail = require('../utils/emailService');

const createLead = async (req, res) => {
  try {
    const { serviceType, projectType, timeline, budget, name, email, phone, contactTime } = req.body;

    if (!serviceType || !projectType || !timeline || !budget || !name || !email) {
      return res.status(400).json({ 
        success: false,
        message: 'Please fill in all required fields' 
      });
    }

    const lead = await Lead.create({
      serviceType,
      projectType,
      timeline,
      budget,
      name,
      email,
      phone,
      contactTime,
    });

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New Lead: ${name} - ${projectType}`,
      html: `
        <h2>New Lead Submission</h2>
        <h3>Project Details</h3>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Preferred Contact Time:</strong> ${contactTime || 'N/A'}</p>
        
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Our team will contact you soon.',
      data: lead,
    });
  } catch (error) {
    console.error('Lead creation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.' 
    });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const { search, status, sort = '-createdAt' } = req.query;
    
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.' 
    });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ 
        success: false,
        message: 'Lead not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.' 
    });
  }
};

const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'in_progress', 'closed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid status' 
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!lead) {
      return res.status(404).json({ 
        success: false,
        message: 'Lead not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Lead status updated',
      data: lead,
    });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.' 
    });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ 
        success: false,
        message: 'Lead not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.' 
    });
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead,
};
