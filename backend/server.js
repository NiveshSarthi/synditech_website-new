const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const distPath = path.join(__dirname, 'dist');
const uploadsPath = path.join(__dirname, 'uploads');

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;

  res.json({
    status: dbConnected ? 'OK' : 'DEGRADED',
    message: 'Synditech Server is running',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/uploads', express.static(uploadsPath));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/leads', require('./routes/lead.routes'));
app.use('/api/newsletter', require('./routes/newsletter.routes'));
app.use('/api/careers', require('./routes/career.routes'));
app.use('/api/blogs', require('./routes/blog.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

if (isProduction && fs.existsSync(path.join(distPath, 'index.html'))) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Synditech Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server startup failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
