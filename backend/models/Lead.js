const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    required: [true, 'Please select a service type'],
    trim: true,
  },
  projectType: {
    type: String,
    required: [true, 'Please select a project type'],
    trim: true,
  },
  timeline: {
    type: String,
    required: [true, 'Please select a timeline'],
    trim: true,
  },
  budget: {
    type: String,
    required: [true, 'Please select a budget range'],
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    trim: true,
  },
  contactTime: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in_progress', 'closed'],
    default: 'new',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Lead', leadSchema);
