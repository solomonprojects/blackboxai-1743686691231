import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection disabled for testing
console.log('Running in test mode without MongoDB');

// API Routes
app.get('/api/auth', (req, res) => res.status(200).json({ message: 'Auth API is running' }));
app.use('/api/auth', authRoutes);
app.get('/api/content', (req, res) => res.status(200).json({ message: 'Content API is running' }));
app.use('/api/content', contentRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});