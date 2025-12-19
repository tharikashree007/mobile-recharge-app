import { useState, useEffect } from 'react';
import { MdSchedule, MdSignalCellularAlt, MdCall, MdMessage, MdClose } from 'react-icons/md';
import axios from 'axios';

function Plans() {
  const [selectedOperator, setSelectedOperator] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/recharge/plans`);
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoadingPlans(false);
    }
  };

  const allPlans = plans;
  const operators = ['All', 'Airtel', 'Jio', 'Vi', 'BSNL'];
  const types = ['All', 'Prepaid', 'Postpaid'];

  const filteredPlans = allPlans.filter(plan => {
    return (selectedOperator === 'All' || plan.operator === selectedOperator) &&
           (selectedType === 'All' || plan.type === selectedType);
  });

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
    setMessage('');
  };

  const handleRecharge = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      setMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const rechargeData = {
        mobile: mobileNumber,
        operator: selectedPlan.operator,
        amount: selectedPlan.amount,
        plan: `${selectedPlan.data || selectedPlan.description} | ${selectedPlan.calls || 'Calls'} | ${selectedPlan.validity}`
      };
      
      if (token) {
        // Authenticated user - save to database
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/recharge/recharge`, rechargeData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Recharge successful!');
      } else {
        // Guest user - use guest endpoint
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/recharge/guest-recharge`, rechargeData);
        setMessage('Recharge successful! (Guest mode - not saved to history)');
      }
      
      setTimeout(() => {
        setShowModal(false);
        setMobileNumber('');
        setSelectedPlan(null);
        setMessage('');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Recharge failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setMobileNumber('');
    setSelectedPlan(null);
    setMessage('');
  };

  return (
    <div className="plans-page">
      {/* Header Section */}
      <section className="plans-header">
        <div className="container">
          <h1>Choose Your Perfect Plan</h1>
          <p>Find the best recharge plans for your needs from all major operators</p>
        </div>
      </section>

      {/* Filters */}
      <section className="plans-filters">
        <div className="container">
          <div className="filter-group">
            <label>Operator:</label>
            <select value={selectedOperator} onChange={(e) => setSelectedOperator(e.target.value)}>
              {operators.map(op => <option key={op} value={op}>{op}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Type:</label>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              {types.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="plans-grid-section">
        <div className="container">
          <div className="plans-grid">
            {filteredPlans.map(plan => (
              <div key={plan._id || plan.id} className="plan-card">
                
                <div className="plan-header">
                  <div className="operator-info">
                    <span className={`operator-badge ${plan.operator.toLowerCase()}`}>
                      {plan.operator}
                    </span>
                    <span className="plan-type">{plan.type}</span>
                  </div>
                  <div className="plan-price">
                    <span className="currency">₹</span>
                    <span className="amount">{plan.amount}</span>
                  </div>
                </div>

                <div className="plan-details">
                  <div className="detail-item">
                    <span className="icon"><MdSchedule /></span>
                    <span className="label">Validity:</span>
                    <span className="value">{plan.validity}</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon"><MdSignalCellularAlt /></span>
                    <span className="label">Data:</span>
                    <span className="value">{plan.data}</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon"><MdCall /></span>
                    <span className="label">Calls:</span>
                    <span className="value">{plan.calls}</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon"><MdMessage /></span>
                    <span className="label">SMS:</span>
                    <span className="value">{plan.sms}</span>
                  </div>
                </div>

                <button 
                  className="select-plan-btn"
                  onClick={() => handlePlanSelect(plan)}
                >
                  Recharge Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recharge Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Recharge Details</h3>
              <button className="close-btn" onClick={closeModal}>
                <MdClose />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="selected-plan-info">
                <h4>{selectedPlan?.operator} - ₹{selectedPlan?.amount}</h4>
                <p>{selectedPlan?.data} | {selectedPlan?.calls} | {selectedPlan?.validity}</p>
                {!localStorage.getItem('token') && (
                  <div className="guest-notice-modal">
                    <small>⚠️ Recharging as guest - transaction won't be saved to history</small>
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label>Mobile Number:</label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                />
              </div>
              
              {message && (
                <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
              
              <div className="modal-actions">
                <button 
                  className="btn btn-secondary" 
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleRecharge}
                  disabled={loading || !mobileNumber}
                >
                  {loading ? 'Processing...' : `Pay ₹${selectedPlan?.amount}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Plans;