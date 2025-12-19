// Updated API configuration for deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/auth/admin/login`,
  
  // Recharge endpoints
  RECHARGE: `${API_BASE_URL}/api/recharge`,
  PLANS: `${API_BASE_URL}/api/recharge/plans`,
  HISTORY: `${API_BASE_URL}/api/recharge/history`,
  
  // Admin endpoints
  ADMIN_STATS: `${API_BASE_URL}/api/admin/stats`,
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  ADMIN_TRANSACTIONS: `${API_BASE_URL}/api/admin/transactions`,
  ADMIN_PLANS: `${API_BASE_URL}/api/admin/plans`,
};

export default API_BASE_URL;