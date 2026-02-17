require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const itemsRouter = require('./routes/items');

const app = express();
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/items', itemsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('-------------------------------------------');
  console.log(`🚀 Express Backend Running on Port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log('-------------------------------------------');
});
