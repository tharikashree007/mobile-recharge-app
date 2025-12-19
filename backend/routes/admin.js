const express = require('express');
const User = require('../models/User');
const Plan = require('../models/Plan');
const Recharge = require('../models/Recharge');
const auth = require('../middleware/auth');
const router = express.Router();

// Middleware to check if user is admin
const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Promote user to admin
router.put('/users/:id/role', auth, adminAuth, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['USER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all plans
router.get('/plans', auth, adminAuth, async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new plan
router.post('/plans', auth, adminAuth, async (req, res) => {
  try {
    const { operator, type, amount, validity, data, calls, sms, description } = req.body;
    const plan = new Plan({ operator, type, amount, validity, data, calls, sms, description });
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update plan
router.put('/plans/:id', auth, adminAuth, async (req, res) => {
  try {
    const { operator, type, amount, validity, data, calls, sms, description } = req.body;
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { operator, type, amount, validity, data, calls, sms, description },
      { new: true }
    );
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete plan
router.delete('/plans/:id', auth, adminAuth, async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Plan deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all recharges
router.get('/recharges', auth, adminAuth, async (req, res) => {
  try {
    const recharges = await Recharge.find().populate('userId', 'name email');
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get stats for dashboard
router.get('/stats', auth, adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRecharges = await Recharge.countDocuments();
    const totalPlans = await Plan.countDocuments();
    const totalRevenue = await Recharge.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);

    // User growth over time (last 12 months)
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Recharge count per operator
    const rechargesPerOperator = await Recharge.aggregate([
      { $group: { _id: '$operator', count: { $sum: 1 } } }
    ]);

    // Plan usage distribution (recharges per plan amount)
    const planUsage = await Recharge.aggregate([
      { $group: { _id: '$amount', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      totalUsers,
      totalRecharges,
      totalPlans,
      totalRevenue: totalRevenue[0]?.total || 0,
      userGrowth,
      rechargesPerOperator,
      planUsage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;