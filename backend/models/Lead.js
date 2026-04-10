const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  service: {
    type: String,
    required: [true, 'Please select a service'],
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
