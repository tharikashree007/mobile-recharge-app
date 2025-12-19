# Mobile Recharge App - MERN Stack

A complete mobile recharge application with **role-based authentication** built with MongoDB, Express.js, React, and Node.js.

## Features

### User Features
- User registration and login
- Mobile recharge for Airtel, Jio, Vi
- Recharge plans selection
- Transaction history
- Personal dashboard
- Responsive design

### Admin Features
- Separate admin login
- Admin dashboard with statistics
- Data visualization (charts)
- CRUD operations on recharge plans
- User management (view all users, change roles)
- View all transactions
- Analytics and insights

## Quick Start

1. **Create admin account:**
   ```bash
   cd backend
   node seedAdmin.js
   ```

2. **Run the app:**
   ```bash
   start.bat
   ```

3. **Manual setup:**
   ```bash
   # Backend
   cd backend
   npm install
   npm run dev

   # Frontend (new terminal)
   cd frontend
   npm install
   npm run dev
   ```

## Access
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **User Login**: http://localhost:5173/login
- **Admin Login**: http://localhost:5173/admin/login

## Default Credentials
- **Admin Email**: admin@example.com
- **Admin Password**: admin123

## User Journey
1. Register at `/register` (creates USER account)
2. Login at `/login`
3. Browse plans and recharge
4. View transaction history

## Admin Journey
1. Login at `/admin/login` with admin credentials
2. View dashboard with statistics and charts
3. Manage recharge plans (Add/Edit/Delete)
4. View and manage users
5. Monitor all transactions

## Tech Stack
- **Frontend:** React, React Router, Axios, Recharts
- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt
- **Database:** MongoDB
- **Authentication:** JWT with role-based access control

## Documentation
- **[QUICK_START.md](QUICK_START.md)** - Get started in 3 steps
- **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)** - Complete implementation details
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and data flow
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Testing checklist

## Security Features
- ✅ Separate USER and ADMIN login endpoints
- ✅ Role-based JWT tokens
- ✅ Backend role validation on every request
- ✅ Protected admin routes
- ✅ No public admin signup
- ✅ Password hashing with bcrypt
- ✅ Frontend route guards