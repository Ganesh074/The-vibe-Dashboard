require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('../models/Item');

const sampleItems = [
  {
    "id": 1,
    "name": "Aurora Lamp",
    "description": "Soft ambient lamp with glassmorphism style",
    "category": "Lighting",
    "createdAt": "2026-02-01T12:00:00Z"
  },
  {
    "id": 2,
    "name": "Nimbus Headphones",
    "description": "Comfortable over-ear headphones with deep bass",
    "category": "Audio",
    "createdAt": "2026-02-02T12:00:00Z"
  },
  {
    "id": 3,
    "name": "Vibe Notebook",
    "description": "Minimal notebook for notes and sketches",
    "category": "Stationery",
    "createdAt": "2026-02-03T12:00:00Z"
  },
  {
    "id": 4,
    "name": "Sierra Backpack",
    "description": "Water-resistant backpack for daily use",
    "category": "Travel",
    "createdAt": "2026-02-04T12:00:00Z"
  },
  {
    "id": 5,
    "name": "Pulse Keyboard",
    "description": "Mechanical keyboard with RGB and subtle transitions",
    "category": "Electronics",
    "createdAt": "2026-02-05T12:00:00Z"
  },
  {
    "id": 6,
    "name": "Glow Mug",
    "description": "Insulated mug with matte finish",
    "category": "Kitchen",
    "createdAt": "2026-02-06T12:00:00Z"
  },
  {
    "id": 7,
    "name": "Orbit Lamp Pro",
    "description": "Desk lamp with adjustable color temperature",
    "category": "Lighting",
    "createdAt": "2026-02-07T12:00:00Z"
  },
  {
    "id": 8,
    "name": "Echo Speaker",
    "description": "Portable Bluetooth speaker with clear mids",
    "category": "Audio",
    "createdAt": "2026-02-08T12:00:00Z"
  },
  {
    "id": 9,
    "name": "Canvas Sneakers",
    "description": "Lightweight sneakers with modern silhouette",
    "category": "Fashion",
    "createdAt": "2026-02-09T12:00:00Z"
  },
  {
    "id": 10,
    "name": "Zen Planter",
    "description": "Small ceramic planter for succulents",
    "category": "Home",
    "createdAt": "2026-02-10T12:00:00Z"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB Atlas');

    // Clear existing items
    await Item.deleteMany({});
    console.log('✓ Cleared existing items');

    // Insert sample items
    const result = await Item.insertMany(sampleItems);
    console.log(`✓ Inserted ${result.length} items into MongoDB`);

    console.log('✓ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
