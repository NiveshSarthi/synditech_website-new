const express = require('express');
const router = express.Router();

let blogs = [];
let nextBlogId = 1;

const sampleBlogs = [
  {
    _id: '1',
    title: 'How AI is Transforming Business Automation in 2025',
    slug: 'how-ai-is-transforming-business-automation',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way businesses automate their workflows and increase efficiency.',
    content: 'Artificial Intelligence has become a game-changer for businesses across all industries. From automating repetitive tasks to providing deep insights through data analytics, AI is helping companies streamline their operations and focus on what matters most.\n\nIn this article, we explore the key ways AI is transforming business automation and how your company can leverage these technologies to stay ahead of the competition.',
    authorName: 'Synditech Team',
    category: 'Technology',
    tags: ['AI', 'Automation', 'Business'],
    coverImage: '',
    isPublished: true,
    createdAt: new Date('2025-03-15')
  },
  {
    _id: '2',
    title: 'Building Scalable Web Applications: A Complete Guide',
    slug: 'building-scalable-web-applications',
    excerpt: 'Learn the best practices for building web applications that can grow with your business needs.',
    content: 'Building scalable web applications requires careful planning and the right technology stack. In this comprehensive guide, we cover everything from architecture design to deployment strategies.\n\nKey topics include: microservices architecture, cloud deployment, database optimization, and performance monitoring.',
    authorName: 'Synditech Team',
    category: 'Development',
    tags: ['Web Development', 'Scalability', 'Architecture'],
    coverImage: '',
    isPublished: true,
    createdAt: new Date('2025-03-10')
  },
  {
    _id: '3',
    title: 'Why Custom Software Development Beats Off-the-Shelf Solutions',
    slug: 'custom-software-vs-off-the-shelf',
    excerpt: 'Explore the benefits of custom software development and why it might be the right choice for your business.',
    content: 'While off-the-shelf solutions offer quick implementation, custom software provides unparalleled flexibility and scalability. In this article, we compare both approaches and help you make an informed decision for your business needs.\n\nCustom software development allows for complete control over features, security, and integration capabilities.',
    authorName: 'Synditech Team',
    category: 'Business',
    tags: ['Software', 'Custom Development', 'Business'],
    coverImage: '',
    isPublished: true,
    createdAt: new Date('2025-03-05')
  }
];

blogs = [...sampleBlogs];
nextBlogId = 4;

router.get('/', (req, res) => {
  const publishedBlogs = blogs.filter(b => b.isPublished).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, data: publishedBlogs });
});

router.get('/all', (req, res) => {
  const allBlogs = [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, data: allBlogs });
});

router.get('/:slug', (req, res) => {
  const blog = blogs.find(b => b.slug === req.params.slug);
  if (!blog) {
    return res.status(404).json({ success: false, message: 'Blog not found' });
  }
  res.json({ success: true, data: blog });
});

router.post('/', (req, res) => {
  const { title, excerpt, content, authorName, category, tags, coverImage } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }

  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  if (blogs.find(b => b.slug === slug)) {
    slug = `${slug}-${Date.now()}`;
  }
  
  const blog = {
    _id: String(nextBlogId++),
    title,
    slug,
    excerpt: excerpt || '',
    content,
    authorName: authorName || 'Admin',
    category: category || 'Technology',
    tags: tags || [],
    coverImage: coverImage || '',
    isPublished: true,
    createdAt: new Date()
  };

  blogs.push(blog);
  res.status(201).json({ success: true, data: blog });
});

router.put('/:id', (req, res) => {
  const blogIndex = blogs.findIndex(b => b._id === req.params.id);
  
  if (blogIndex === -1) {
    return res.status(404).json({ success: false, message: 'Blog not found' });
  }

  const { title, excerpt, content, authorName, category, tags, coverImage, isPublished } = req.body;

  blogs[blogIndex] = {
    ...blogs[blogIndex],
    title: title || blogs[blogIndex].title,
    excerpt: excerpt !== undefined ? excerpt : blogs[blogIndex].excerpt,
    content: content || blogs[blogIndex].content,
    authorName: authorName || blogs[blogIndex].authorName,
    category: category || blogs[blogIndex].category,
    tags: tags || blogs[blogIndex].tags,
    coverImage: coverImage !== undefined ? coverImage : blogs[blogIndex].coverImage,
    isPublished: isPublished !== undefined ? isPublished : blogs[blogIndex].isPublished,
  };

  res.json({ success: true, data: blogs[blogIndex] });
});

router.delete('/:id', (req, res) => {
  const blogIndex = blogs.findIndex(b => b._id === req.params.id);
  
  if (blogIndex === -1) {
    return res.status(404).json({ success: false, message: 'Blog not found' });
  }

  blogs.splice(blogIndex, 1);
  res.json({ success: true, message: 'Blog deleted successfully' });
});

module.exports = router;
