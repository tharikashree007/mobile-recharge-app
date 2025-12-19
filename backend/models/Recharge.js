const mongoose = require('mongoose');

const rechargeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mobile: { type: String, required: true },
  operator: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'success' },
  transactionId: { type: String, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Recharge', rechargeSchema);