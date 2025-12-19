const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const plans = [
  // Airtel Plans
  { operator: 'Airtel', type: 'Prepaid', amount: 99, validity: '28 days', data: '1GB/day', calls: 'Unlimited', sms: '100/day', description: 'Basic daily data plan with unlimited calls' },
  { operator: 'Airtel', type: 'Prepaid', amount: 149, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Popular plan with 1.5GB daily data' },
  { operator: 'Airtel', type: 'Prepaid', amount: 199, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'High data plan for heavy users' },
  { operator: 'Airtel', type: 'Prepaid', amount: 299, validity: '28 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Premium daily data plan' },
  { operator: 'Airtel', type: 'Prepaid', amount: 399, validity: '56 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Long validity plan with 2GB daily data' },
  { operator: 'Airtel', type: 'Prepaid', amount: 499, validity: '56 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Extended validity premium plan' },
  { operator: 'Airtel', type: 'Prepaid', amount: 599, validity: '84 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Quarterly plan with daily 2GB data' },
  { operator: 'Airtel', type: 'Prepaid', amount: 699, validity: '84 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Quarterly premium data plan' },
  { operator: 'Airtel', type: 'Prepaid', amount: 999, validity: '84 days', data: '3GB/day', calls: 'Unlimited', sms: '100/day', description: 'High-end quarterly plan' },
  { operator: 'Airtel', type: 'Prepaid', amount: 1499, validity: '365 days', data: '24GB', calls: 'Unlimited', sms: '3600', description: 'Annual plan with total 24GB data' },
  { operator: 'Airtel', type: 'Prepaid', amount: 2999, validity: '365 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Annual unlimited plan' },

  // Jio Plans
  { operator: 'Jio', type: 'Prepaid', amount: 129, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Jio basic plan with 2GB daily data' },
  { operator: 'Jio', type: 'Prepaid', amount: 179, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Jio popular plan with additional benefits' },
  { operator: 'Jio', type: 'Prepaid', amount: 239, validity: '28 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Jio enhanced data plan' },
  { operator: 'Jio', type: 'Prepaid', amount: 299, validity: '28 days', data: '3GB/day', calls: 'Unlimited', sms: '100/day', description: 'Jio premium daily data plan' },
  { operator: 'Jio', type: 'Prepaid', amount: 349, validity: '56 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Jio extended validity plan' },
  { operator: 'Jio', type: 'Prepaid', amount: 449, validity: '56 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Jio long validity premium plan' },
  { operator: 'Jio', type: 'Prepaid', amount: 549, validity: '84 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Jio quarterly plan' },
  { operator: 'Jio', type: 'Prepaid', amount: 719, validity: '84 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Jio quarterly premium plan' },
  { operator: 'Jio', type: 'Prepaid', amount: 999, validity: '84 days', data: '3GB/day', calls: 'Unlimited', sms: '100/day', description: 'Jio high-end quarterly plan' },
  { operator: 'Jio', type: 'Prepaid', amount: 1559, validity: '336 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Jio annual plan with daily 2GB' },
  { operator: 'Jio', type: 'Prepaid', amount: 2999, validity: '365 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Jio premium annual plan' },

  // Vi (Vodafone Idea) Plans
  { operator: 'Vi', type: 'Prepaid', amount: 109, validity: '28 days', data: '1GB/day', calls: 'Unlimited', sms: '100/day', description: 'Vi basic daily data plan' },
  { operator: 'Vi', type: 'Prepaid', amount: 159, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Vi popular plan with weekend data rollover' },
  { operator: 'Vi', type: 'Prepaid', amount: 209, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Vi enhanced data plan' },
  { operator: 'Vi', type: 'Prepaid', amount: 319, validity: '28 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Vi premium daily plan' },
  { operator: 'Vi', type: 'Prepaid', amount: 379, validity: '56 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Vi extended validity plan' },
  { operator: 'Vi', type: 'Prepaid', amount: 479, validity: '56 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Vi long validity premium plan' },
  { operator: 'Vi', type: 'Prepaid', amount: 579, validity: '84 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Vi quarterly plan' },
  { operator: 'Vi', type: 'Prepaid', amount: 699, validity: '84 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Vi quarterly premium plan' },
  { operator: 'Vi', type: 'Prepaid', amount: 899, validity: '84 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Vi high-end quarterly plan' },
  { operator: 'Vi', type: 'Prepaid', amount: 1799, validity: '365 days', data: '24GB', calls: 'Unlimited', sms: '3600', description: 'Vi annual plan with total data' },
  { operator: 'Vi', type: 'Prepaid', amount: 2899, validity: '365 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Vi annual unlimited plan' },

  // Special/Top-up Plans for all operators
  { operator: 'Airtel', type: 'Prepaid', amount: 19, validity: '1 day', data: '1GB', calls: 'Local/STD', sms: '20', description: 'Emergency 1-day data booster' },
  { operator: 'Airtel', type: 'Prepaid', amount: 48, validity: '28 days', data: '3GB', calls: 'No', sms: 'No', description: 'Data-only add-on plan' },
  { operator: 'Airtel', type: 'Prepaid', amount: 65, validity: '28 days', data: '4GB', calls: 'No', sms: 'No', description: 'High-speed data booster' },
  
  { operator: 'Jio', type: 'Prepaid', amount: 15, validity: '1 day', data: '1GB', calls: 'Unlimited', sms: '10', description: 'Jio 1-day emergency plan' },
  { operator: 'Jio', type: 'Prepaid', amount: 39, validity: '28 days', data: '2GB', calls: 'No', sms: 'No', description: 'Jio data add-on' },
  { operator: 'Jio', type: 'Prepaid', amount: 61, validity: '28 days', data: '6GB', calls: 'No', sms: 'No', description: 'Jio high-speed data pack' },
  
  { operator: 'Vi', type: 'Prepaid', amount: 22, validity: '1 day', data: '1GB', calls: 'Local/STD', sms: '20', description: 'Vi emergency data plan' },
  { operator: 'Vi', type: 'Prepaid', amount: 49, validity: '28 days', data: '3GB', calls: 'No', sms: 'No', description: 'Vi data-only pack' },
  { operator: 'Vi', type: 'Prepaid', amount: 69, validity: '28 days', data: '5GB', calls: 'No', sms: 'No', description: 'Vi premium data booster' },

  // Postpaid Plans
  { operator: 'Airtel', type: 'Postpaid', amount: 399, validity: '30 days', data: '40GB', calls: 'Unlimited', sms: '100/day', description: 'Airtel postpaid basic plan' },
  { operator: 'Airtel', type: 'Postpaid', amount: 499, validity: '30 days', data: '75GB', calls: 'Unlimited', sms: '100/day', description: 'Airtel postpaid popular plan' },
  { operator: 'Airtel', type: 'Postpaid', amount: 699, validity: '30 days', data: '100GB', calls: 'Unlimited', sms: '100/day', description: 'Airtel postpaid premium plan' },
  { operator: 'Airtel', type: 'Postpaid', amount: 999, validity: '30 days', data: '150GB', calls: 'Unlimited', sms: 'Unlimited', description: 'Airtel postpaid family plan' },

  { operator: 'Jio', type: 'Postpaid', amount: 399, validity: '30 days', data: '75GB', calls: 'Unlimited', sms: '100/day', description: 'Jio postpaid starter plan' },
  { operator: 'Jio', type: 'Postpaid', amount: 599, validity: '30 days', data: '100GB', calls: 'Unlimited', sms: '100/day', description: 'Jio postpaid plus plan' },
  { operator: 'Jio', type: 'Postpaid', amount: 799, validity: '30 days', data: '150GB', calls: 'Unlimited', sms: 'Unlimited', description: 'Jio postpaid max plan' },
  { operator: 'Jio', type: 'Postpaid', amount: 1199, validity: '30 days', data: '200GB', calls: 'Unlimited', sms: 'Unlimited', description: 'Jio postpaid platinum plan' },

  { operator: 'Vi', type: 'Postpaid', amount: 449, validity: '30 days', data: '50GB', calls: 'Unlimited', sms: '100/day', description: 'Vi postpaid basic plan' },
  { operator: 'Vi', type: 'Postpaid', amount: 649, validity: '30 days', data: '90GB', calls: 'Unlimited', sms: '100/day', description: 'Vi postpaid smart plan' },
  { operator: 'Vi', type: 'Postpaid', amount: 849, validity: '30 days', data: '120GB', calls: 'Unlimited', sms: 'Unlimited', description: 'Vi postpaid premium plan' },
  { operator: 'Vi', type: 'Postpaid', amount: 1099, validity: '30 days', data: '200GB', calls: 'Unlimited', sms: 'Unlimited', description: 'Vi postpaid family plan' }
];

async function seedPlans() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing plans
    await Plan.deleteMany({});
    console.log('Cleared existing plans');

    // Insert new plans
    await Plan.insertMany(plans);
    console.log(`Successfully added ${plans.length} plans to the database`);

    // Display summary
    const airtelCount = plans.filter(p => p.operator === 'Airtel').length;
    const jioCount = plans.filter(p => p.operator === 'Jio').length;
    const viCount = plans.filter(p => p.operator === 'Vi').length;
    const prepaidCount = plans.filter(p => p.type === 'Prepaid').length;
    const postpaidCount = plans.filter(p => p.type === 'Postpaid').length;

    console.log('\n📊 Plans Summary:');
    console.log(`📱 Airtel: ${airtelCount} plans`);
    console.log(`📱 Jio: ${jioCount} plans`);
    console.log(`📱 Vi: ${viCount} plans`);
    console.log(`💳 Prepaid: ${prepaidCount} plans`);
    console.log(`💳 Postpaid: ${postpaidCount} plans`);
    console.log(`💰 Price range: ₹${Math.min(...plans.map(p => p.amount))} - ₹${Math.max(...plans.map(p => p.amount))}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
}

seedPlans();