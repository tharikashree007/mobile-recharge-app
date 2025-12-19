const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  operator: { type: String, required: true },
  type: { type: String, required: true, enum: ['Prepaid', 'Postpaid'] },
  amount: { type: Number, required: true },
  validity: { type: String, required: true },
  data: { type: String, required: true },
  calls: { type: String, required: true },
  sms: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);