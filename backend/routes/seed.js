const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Seed admin endpoint (one-time use)
router.get('/admin', async (req, res) => {
  try {
    const adminEmail = 'admin@example.com';
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      return res.json({ message: 'Admin already exists', email: adminEmail });
    }
    
    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: adminEmail,
      password: 'admin123',
      phone: '9876543210',
      role: 'ADMIN',
      balance: 0
    });
    
    await adminUser.save();
    
    res.json({ 
      message: 'Admin created successfully!',
      email: adminEmail,
      password: 'admin123'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;