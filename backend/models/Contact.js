const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
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
    default: '',
  },
  subject: {
    type: String,
    trim: true,
    default: 'Website Contact Form',
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);
