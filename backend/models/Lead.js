const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
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
  company: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  service: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'lost'],
    default: 'new',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Lead', leadSchema);