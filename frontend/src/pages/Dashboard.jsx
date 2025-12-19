import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard({ user, setUser }) {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddMoney = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/recharge/add-money',
        { amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update user balance in state
      setUser(prev => ({ ...prev, balance: response.data.balance }));
      setMessage('Money added successfully!');
      setAmount('');
      setTimeout(() => {
        setShowAddMoney(false);
        setMessage('');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add money');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Balance</h3>
          <p>₹{user.balance}</p>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddMoney(true)}
            style={{ marginTop: '10px', fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
          >
            Add Money
          </button>
        </div>
        <div className="stat-card">
          <h3>Phone</h3>
          <p>{user.phone}</p>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <Link to="/recharge" className="action-card">
          <h3>Mobile Recharge</h3>
          <p>Recharge your mobile</p>
        </Link>
        
        <Link to="/history" className="action-card">
          <h3>History</h3>
          <p>View transactions</p>
        </Link>
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Money to Wallet</h3>
              <button className="close-btn" onClick={() => setShowAddMoney(false)}>×</button>
            </div>
            <div className="modal-content">
              <form onSubmit={handleAddMoney}>
                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    required
                  />
                </div>
                {message && (
                  <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                    {message}
                  </div>
                )}
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowAddMoney(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={loading || !amount}
                  >
                    {loading ? 'Adding...' : `Add ₹${amount || '0'}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;