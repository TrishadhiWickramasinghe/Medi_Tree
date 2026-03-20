import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config({ path: '../.env' });

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    const existing = await User.findOne({ email: 'admin@meditree.com' });
    if (existing) {
      console.log('Admin already exists. Skipping.');
      process.exit(0);
    }

    await User.create({
      name: 'System Admin',
      email: 'admin@meditree.com',
      password: 'admin123',
      role: 'admin',
      isActive: true
    });

    console.log('Admin account created successfully!');
    console.log('Email:    admin@meditree.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();