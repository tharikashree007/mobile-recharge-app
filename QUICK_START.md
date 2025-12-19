# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Create Admin Account
```bash
cd backend
node seedAdmin.js
```

### Step 2: Start Application
```bash
start.bat
```

### Step 3: Access the App
- **User Login**: http://localhost:5173/login
- **Admin Login**: http://localhost:5173/admin/login
- **Register**: http://localhost:5173/register

---

## 🔑 Default Credentials

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123
- **Access**: http://localhost:5173/admin/login

### User Account
- Create your own at: http://localhost:5173/register

---

## 📋 What's Implemented

### ✅ Authentication
- Separate USER and ADMIN login pages
- Role-based JWT tokens
- Secure password hashing
- Protected routes

### ✅ User Features
- Register and login
- View recharge plans
- Perform mobile recharge
- View transaction history
- Personal dashboard

### ✅ Admin Features
- Admin-only login
- Dashboard with statistics
- Data visualization (charts)
- CRUD operations on plans
- User management
- View all transactions

### ✅ Security
- Backend role validation
- JWT with role payload
- Admin middleware protection
- No public admin signup
- Route guards on frontend

---

## 🎯 User Flows

### New User
1. Go to `/register`
2. Create account (auto role: USER)
3. Redirected to `/user/home`
4. Start recharging!

### Admin
1. Go to `/admin/login`
2. Login with admin credentials
3. Redirected to `/admin/dashboard`
4. Manage plans and users

---

## 📁 Key Files

### Backend
- `models/User.js` - User model with role field
- `routes/auth.js` - Separate login endpoints
- `routes/admin.js` - Admin-only routes
- `middleware/auth.js` - JWT validation
- `seedAdmin.js` - Create admin account

### Frontend
- `components/auth/Login.jsx` - User login
- `components/auth/AdminLogin.jsx` - Admin login
- `pages/Dashboard.jsx` - User dashboard
- `pages/Admin.jsx` - Admin dashboard
- `routes/AppRoutes.jsx` - Role-based routing

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Axios, Recharts
- **Backend**: Node.js, Express, MongoDB, JWT
- **Database**: MongoDB
- **Authentication**: JWT with role-based access

---

## 📞 Need Help?

Check these files:
- `IMPLEMENTATION_GUIDE.md` - Complete implementation details
- `TESTING_GUIDE.md` - Testing checklist
- `README.md` - Project overview
