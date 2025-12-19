const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';
    
    // Delete existing admin to recreate with correct password
    await mongoose.connection.collection('users').deleteOne({ email: adminEmail });
    
    // Create new admin with hashed password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await mongoose.connection.collection('users').insertOne({
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
      phone: '9876543210',
      role: 'ADMIN',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin();