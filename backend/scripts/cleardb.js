require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('../models/Item');

const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB Atlas');

    // Delete all items
    const result = await Item.deleteMany({});
    console.log(`✓ Deleted ${result.deletedCount} documents from items collection`);

    console.log('✓ Database cleared successfully');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error clearing database:', error.message);
    process.exit(1);
  }
};

clearDatabase();
