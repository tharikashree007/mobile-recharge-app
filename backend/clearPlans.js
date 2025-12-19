const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const clearPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recharge-app');
    console.log('Connected to MongoDB');
    
    const result = await Plan.deleteMany({});
    console.log(`Deleted ${result.deletedCount} existing plans`);
    
    console.log('All plans cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing plans:', error);
    process.exit(1);
  }
};

clearPlans();