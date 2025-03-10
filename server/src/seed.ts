import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import db from './config/connection.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await db;

    console.log('📦 Connected to MongoDB, seeding data...');

    // Clear existing data
    await User.deleteMany({});

    // Create sample users
    const users = await User.create([
      {
        username: 'booklover1',
        email: 'booklover1@example.com',
        password: 'password123',
        savedBooks: [
          {
            bookId: '1',
            title: 'The Great Gatsby',
            authors: ['F. Scott Fitzgerald'],
            description: 'A novel set in the Jazz Age on Long Island.',
            image: 'link-to-image',
            link: 'link-to-book',
          },
        ],
      },
      {
        username: 'readaholic',
        email: 'readaholic@example.com',
        password: 'password123',
        savedBooks: [
          {
            bookId: '2',
            title: '1984',
            authors: ['George Orwell'],
            description: 'A dystopian novel about totalitarianism.',
            image: 'link-to-image',
            link: 'link-to-book',
          },
        ],
      },
    ]);

    console.log('✅ Sample users created:', users);
    console.log('📚 Seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
