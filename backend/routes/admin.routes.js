const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const CareerApplication = require('../models/CareerApplication');
const Blog = require('../models/Blog');
const { requireAdminAuth } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'synditech-secret-key-2024';

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ success: false, message: 'Admin credentials are not configured' });
  }

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

router.post('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

router.get('/applications', requireAdminAuth, async (req, res) => {
  try {
    const applications = await CareerApplication.find().sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
});

router.get('/blogs', requireAdminAuth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
});

router.post('/blogs', requireAdminAuth, async (req, res) => {
  try {
    const { title, excerpt, content, authorName, category, tags, coverImage, isPublished } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    let slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!slug) {
      slug = `blog-${Date.now()}`;
    }

    const existing = await Blog.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt: excerpt || '',
      content,
      authorName: authorName || 'Admin',
      category: category || 'Technology',
      tags: Array.isArray(tags) ? tags : [],
      coverImage: coverImage || '',
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create blog' });
  }
});

router.put('/blogs/:id', requireAdminAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const { title, excerpt, content, authorName, category, tags, coverImage, isPublished } = req.body;

    if (title && title !== blog.title) {
      let slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (!slug) {
        slug = `blog-${Date.now()}`;
      }
      const existing = await Blog.findOne({ slug, _id: { $ne: blog._id } });
      blog.slug = existing ? `${slug}-${Date.now()}` : slug;
      blog.title = title;
    }

    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (content !== undefined) blog.content = content;
    if (authorName !== undefined) blog.authorName = authorName;
    if (category !== undefined) blog.category = category;
    if (tags !== undefined) blog.tags = Array.isArray(tags) ? tags : [];
    if (coverImage !== undefined) blog.coverImage = coverImage;
    if (isPublished !== undefined) blog.isPublished = isPublished;

    await blog.save();
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update blog' });
  }
});

router.delete('/blogs/:id', requireAdminAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete blog' });
  }
});

module.exports = router;
