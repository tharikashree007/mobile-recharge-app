# Role-Based Authentication Implementation Guide

## ✅ IMPLEMENTATION STATUS: COMPLETE

Your mobile recharge application now has a **complete role-based authentication system** with separate USER and ADMIN flows.

---

## 🔐 Authentication Structure

### Login Routes
- **User Login**: `/login` → Only for users with `role === "USER"`
- **Admin Login**: `/admin/login` → Only for users with `role === "ADMIN"`

### Signup Restrictions
- ✅ Users can sign up via `/register` (default role: `USER`)
- ❌ Admin accounts **CANNOT** be created through public signup
- ✅ Admin accounts must be created manually or via database seeding

---

## 🎯 User Roles

### Role Field in User Model
```javascript
role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' }
```

### Default Behavior
- All new signups → `role: "USER"`
- Admin accounts → Created via `seedAdmin.js` script

---

## 🔒 Backend Security

### Separate Login APIs

#### 1. User Login (`POST /api/auth/login`)
```javascript
// Verifies email and password
// Checks: role === "USER"
// Returns: JWT with { userId, role }
```

#### 2. Admin Login (`POST /api/auth/admin/login`)
```javascript
// Verifies email and password
// Checks: role === "ADMIN"
// Returns: JWT with { userId, role }
```

### Role-Based Middleware
```javascript
// auth.js - Extracts role from JWT
req.userRole = decoded.role;

// admin.js - Protects admin routes
const adminAuth = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};
```

### Protected Admin Routes
All routes under `/api/admin/*` require:
1. Valid JWT token
2. `role === "ADMIN"`

#### Admin-Only APIs
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id/role` - Change user role
- `GET /api/admin/plans` - List all plans
- `POST /api/admin/plans` - Add new plan
- `PUT /api/admin/plans/:id` - Update plan
- `DELETE /api/admin/plans/:id` - Delete plan
- `GET /api/admin/recharges` - View all recharges

---

## 🎨 Frontend Implementation

### Separate Login Pages

#### User Login (`/login`)
- Component: `src/components/auth/Login.jsx`
- API: `POST /api/auth/login`
- Redirects to: `/user/home`

#### Admin Login (`/admin/login`)
- Component: `src/components/auth/AdminLogin.jsx`
- API: `POST /api/auth/admin/login`
- Redirects to: `/admin/dashboard`

### Route Protection
```javascript
// AppRoutes.jsx
<Route path="/user/home" 
  element={user && user.role === 'USER' ? <Dashboard /> : <Navigate to="/login" />} 
/>

<Route path="/admin/dashboard" 
  element={user && user.role === 'ADMIN' ? <Admin /> : <Navigate to="/admin/login" />} 
/>
```

### Role-Based Navigation
- **USER**: Can access Dashboard, History, Recharge
- **ADMIN**: Can access Admin Panel only
- Navbar dynamically shows links based on `user.role`

---

## 📊 Admin Dashboard Features

### Statistics Display
- Total Users
- Total Recharges
- Total Revenue
- Active Plans

### Data Visualization
- User Growth Chart (Line Chart)
- Recharges Per Operator (Bar Chart)
- Plan Usage Distribution (Pie Chart)

### CRUD Operations
1. **Plans Management**
   - Add new plans
   - Edit existing plans
   - Delete plans

2. **User Management**
   - View all users
   - Change user roles (USER ↔ ADMIN)

3. **Recharge History**
   - View all transactions
   - Filter by operator/user

---

## 🚀 Setup Instructions

### 1. Create Admin Account
```bash
cd backend
node seedAdmin.js
```

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

### 2. Start the Application
```bash
# Option 1: Use start.bat
start.bat

# Option 2: Manual start
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### 3. Access Points
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **User Login**: http://localhost:5173/login
- **Admin Login**: http://localhost:5173/admin/login

---

## 🧪 Testing the Implementation

### Test User Flow
1. Go to `/register`
2. Create a new account
3. Login at `/login`
4. Verify redirect to `/user/home`
5. Access Dashboard, History, Recharge pages

### Test Admin Flow
1. Go to `/admin/login`
2. Login with admin credentials
3. Verify redirect to `/admin/dashboard`
4. Test CRUD operations on plans
5. View statistics and charts

### Test Security
1. Try accessing `/admin/dashboard` without login → Redirects to `/admin/login`
2. Try logging in as USER at `/admin/login` → Error: "Access denied. Admin login only."
3. Try logging in as ADMIN at `/login` → Error: "Access denied. User login only."
4. Try accessing admin APIs without token → 401 Unauthorized
5. Try accessing admin APIs with USER token → 403 Forbidden

---

## 🔑 Key Security Features

### Backend
✅ Separate login endpoints for USER and ADMIN
✅ Role validation before issuing JWT
✅ Role included in JWT payload
✅ Middleware validates role on every admin request
✅ Database-level role enforcement

### Frontend
✅ Separate login pages
✅ Role-based route protection
✅ Role-based navigation
✅ Role-based UI rendering
✅ Automatic redirects based on role

---

## 📁 File Structure

```
backend/
├── models/
│   └── User.js              # User model with role field
├── routes/
│   ├── auth.js              # Separate login endpoints
│   └── admin.js             # Admin-only routes with middleware
├── middleware/
│   └── auth.js              # JWT validation + role extraction
└── seedAdmin.js             # Admin account creation script

frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx           # User login
│   │   │   ├── AdminLogin.jsx      # Admin login
│   │   │   └── Register.jsx        # User signup only
│   │   └── layout/
│   │       └── Navbar.jsx          # Role-based navigation
│   ├── pages/
│   │   ├── Dashboard.jsx           # User dashboard
│   │   └── Admin.jsx               # Admin dashboard
│   └── routes/
│       └── AppRoutes.jsx           # Role-based routing
```

---

## 🎯 User Journeys

### New User Journey
1. Visit homepage
2. Click "Get Started" → `/register`
3. Fill registration form
4. Auto-login with `role: "USER"`
5. Redirect to `/user/home`
6. Access recharge features

### Admin Journey
1. Visit `/admin/login` directly
2. Login with admin credentials
3. Redirect to `/admin/dashboard`
4. Manage plans, users, view analytics
5. No access to user recharge features

### Existing User Journey
1. Visit `/login`
2. Enter credentials
3. System checks role:
   - If `USER` → `/user/home`
   - If `ADMIN` → `/admin/dashboard`

---

## 🛡️ Security Best Practices Implemented

1. ✅ **No client-side role checks only** - All validation on backend
2. ✅ **JWT includes role** - Role verified on every request
3. ✅ **Separate login endpoints** - Prevents role confusion
4. ✅ **Admin middleware** - Double-checks role from database
5. ✅ **No public admin signup** - Admins created manually only
6. ✅ **Role-based redirects** - Users can't access wrong dashboards
7. ✅ **Protected routes** - Frontend guards all sensitive pages
8. ✅ **Token validation** - All admin APIs require valid JWT

---

## 📝 Environment Variables

Ensure your `.env` file contains:
```env
MONGODB_URI=mongodb://localhost:27017/recharge-app
JWT_SECRET=your-secret-key-here
PORT=5000
```

---

## 🎉 Summary

Your application now has:
- ✅ Complete role-based authentication
- ✅ Separate USER and ADMIN login flows
- ✅ Secure backend with role validation
- ✅ Protected admin routes
- ✅ Admin dashboard with CRUD operations
- ✅ Data visualization with charts
- ✅ Role-based navigation and UI
- ✅ Proper security implementation

**The system is production-ready with proper separation of concerns between USER and ADMIN roles!**
