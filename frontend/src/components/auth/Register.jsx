import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

function Register({ onLogin }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    phone: '', 
    role: 'customer' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, formData);
      onLogin(response.data.token, response.data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        
        {error && <div className="error">{error}</div>}
        
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          pattern="[0-9]{10}"
          maxLength="10"
          required
        />
        

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          minLength="6"
          required
        />
        
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        <p style={{textAlign: 'center', marginTop: '1rem', color: '#6b7280'}}>
          Already have an account? <Link to="/login" style={{color: '#3b82f6'}}>Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;