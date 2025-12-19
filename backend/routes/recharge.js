const express = require('express');
const Recharge = require('../models/Recharge');
const Plan = require('../models/Plan');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all plans (public endpoint)
router.get('/plans', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/plans/:operator', async (req, res) => {
  try {
    const { operator } = req.params;
    const plans = await Plan.find({ operator });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add money to wallet
router.post('/add-money', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    
    const user = await User.findById(req.userId);
    user.balance += parseFloat(amount);
    await user.save();
    
    res.json({ message: 'Money added successfully', balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/recharge', auth, async (req, res) => {
  try {
    const { mobile, operator, amount } = req.body;
    
    // Check user balance
    const user = await User.findById(req.userId);
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    // Deduct amount from balance
    user.balance -= parseFloat(amount);
    await user.save();
    
    const recharge = new Recharge({
      userId: req.userId,
      mobile,
      operator,
      amount,
      transactionId: 'TXN' + Date.now()
    });
    
    await recharge.save();
    res.status(201).json({ 
      message: 'Recharge successful', 
      recharge,
      remainingBalance: user.balance 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/guest-recharge', async (req, res) => {
  try {
    const { mobile, operator, amount } = req.body;
    
    // Simulate recharge processing
    const transactionId = 'GUEST_TXN' + Date.now();
    
    res.status(201).json({ 
      message: 'Recharge successful', 
      transactionId,
      mobile,
      operator,
      amount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const recharges = await Recharge.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;