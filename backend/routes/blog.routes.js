const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
  try {
    const publishedBlogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: publishedBlogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const allBlogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: allBlogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
});

module.exports = router;
