const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('MongoDB Connected');

  // Seed initial plans if none exist
  const Plan = require('./models/Plan');
  const planCount = await Plan.countDocuments();
  if (planCount === 0) {
    const initialPlans = [
      { operator: 'Airtel', amount: 199, validity: '28 days', description: 'Unlimited calls + 1.5GB/day' },
      { operator: 'Airtel', amount: 399, validity: '56 days', description: 'Unlimited calls + 2.5GB/day' },
      { operator: 'Jio', amount: 149, validity: '24 days', description: 'Unlimited calls + 1GB/day' },
      { operator: 'Jio', amount: 299, validity: '28 days', description: 'Unlimited calls + 2GB/day' },
      { operator: 'Vi', amount: 179, validity: '28 days', description: 'Unlimited calls + 1GB/day' },
      { operator: 'Vi', amount: 349, validity: '56 days', description: 'Unlimited calls + 2GB/day' }
    ];
    await Plan.insertMany(initialPlans);
    console.log('Initial plans seeded');
  }
})
.catch(err => {
  console.log('MongoDB connection failed:', err.message);
  console.log('Please make sure MongoDB is running on your system');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recharge', require('./routes/recharge'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Make sure MongoDB is running for full functionality');
});