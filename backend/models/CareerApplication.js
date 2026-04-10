const mongoose = require('mongoose');

const careerApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    trim: true
  },
  resume: {
    type: String
  },
  status: {
    type: String,
    enum: ['new', 'reviewing', 'interview', 'rejected', 'accepted'],
    default: 'new'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CareerApplication', careerApplicationSchema);
