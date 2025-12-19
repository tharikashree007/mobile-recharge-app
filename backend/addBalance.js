const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function addBalanceToUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Add ₹5000 balance to all users
    const result = await User.updateMany(
      { role: 'USER' },
      { $set: { balance: 5000 } }
    );

    console.log(`✅ Added ₹5000 balance to ${result.modifiedCount} users`);
    
    // Show updated users
    const users = await User.find({ role: 'USER' }).select('name email balance');
    console.log('\n📊 Updated Users:');
    users.forEach(user => {
      console.log(`👤 ${user.name} (${user.email}): ₹${user.balance}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addBalanceToUsers();