const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    default: 'Admin'
  },
  category: {
    type: String,
    default: 'Technology'
  },
  tags: [{
    type: String
  }],
  coverImage: {
    type: String,
    default: ''
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
