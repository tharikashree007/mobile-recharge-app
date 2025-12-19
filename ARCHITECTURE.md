# System Architecture

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     USER AUTHENTICATION                      │
└─────────────────────────────────────────────────────────────┘

/register → User Model (role: USER) → JWT Token → /user/home
                                         ↓
/login → Verify (role === USER) → JWT Token → /user/home
                                         ↓
                              localStorage: { token, user }


┌─────────────────────────────────────────────────────────────┐
│                    ADMIN AUTHENTICATION                      │
└─────────────────────────────────────────────────────────────┘

seedAdmin.js → User Model (role: ADMIN)
                      ↓
/admin/login → Verify (role === ADMIN) → JWT Token → /admin/dashboard
                                            ↓
                                 localStorage: { token, user }
```

---

## Backend Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                         CLIENT REQUEST                        │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                      ROUTE LAYER                              │
│  /api/auth/login          → User login only                   │
│  /api/auth/admin/login    → Admin login only                  │
│  /api/auth/register       → User signup (role: USER)          │
│  /api/admin/*             → Admin routes (protected)          │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE LAYER                           │
│  1. auth.js               → Verify JWT, extract role          │
│  2. adminAuth             → Verify role === ADMIN             │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER                            │
│  User Model: { name, email, password, role }                 │
│  Plan Model: { operator, amount, validity, description }     │
│  Recharge Model: { userId, operator, amount, phone }         │
└──────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                         APP.JSX                               │
│  - Manages global user state                                 │
│  - Provides login/logout functions                           │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                      APPROUTES.JSX                            │
│  - Role-based route protection                               │
│  - Automatic redirects based on role                         │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────┬────────────────────────────────────┐
│      USER ROUTES        │        ADMIN ROUTES                │
├─────────────────────────┼────────────────────────────────────┤
│ /login                  │ /admin/login                       │
│ /register               │ /admin/dashboard                   │
│ /user/home              │   - Stats & Charts                 │
│ /recharge               │   - User Management                │
│ /history                │   - Plan CRUD                      │
│ /plans                  │   - Transaction View               │
└─────────────────────────┴────────────────────────────────────┘
```

---

## Security Layers

```
┌──────────────────────────────────────────────────────────────┐
│                    LAYER 1: FRONTEND                          │
│  - Separate login pages                                      │
│  - Role-based route guards                                   │
│  - Conditional UI rendering                                  │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                    LAYER 2: API ENDPOINTS                     │
│  - Separate login APIs                                       │
│  - Role validation before JWT issuance                       │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                    LAYER 3: JWT TOKEN                         │
│  - Contains userId and role                                  │
│  - Signed with secret key                                    │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                    LAYER 4: MIDDLEWARE                        │
│  - Verifies JWT on every request                            │
│  - Extracts and validates role                              │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                    LAYER 5: DATABASE                          │
│  - Role stored in User model                                │
│  - Double-check role from database                          │
└──────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### User Recharge Flow
```
User → Login (/login) → JWT (role: USER) → /user/home
  ↓
Select Plan → Enter Details → POST /api/recharge
  ↓
Backend validates JWT → Check role === USER → Save to DB
  ↓
Return success → Update UI → Show in /history
```

### Admin Plan Management Flow
```
Admin → Login (/admin/login) → JWT (role: ADMIN) → /admin/dashboard
  ↓
Add/Edit Plan → POST/PUT /api/admin/plans
  ↓
Backend validates JWT → Check role === ADMIN → Save to DB
  ↓
Return success → Refresh plans list → Update UI
```

---

## Role-Based Access Matrix

| Feature                  | USER | ADMIN |
|--------------------------|------|-------|
| Register                 | ✅   | ❌    |
| Login at /login          | ✅   | ❌    |
| Login at /admin/login    | ❌   | ✅    |
| View Plans               | ✅   | ✅    |
| Perform Recharge         | ✅   | ❌    |
| View Own History         | ✅   | ❌    |
| View All Transactions    | ❌   | ✅    |
| Add/Edit/Delete Plans    | ❌   | ✅    |
| View All Users           | ❌   | ✅    |
| Change User Roles        | ❌   | ✅    |
| View Statistics          | ❌   | ✅    |
| View Charts              | ❌   | ✅    |

---

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  balance: Number (default: 0),
  role: String (enum: ['USER', 'ADMIN'], default: 'USER'),
  createdAt: Date,
  updatedAt: Date
}
```

### Plan Collection
```javascript
{
  _id: ObjectId,
  operator: String,
  amount: Number,
  validity: String,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Recharge Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  operator: String,
  amount: Number,
  phone: String,
  status: String (default: 'success'),
  createdAt: Date,
  updatedAt: Date
}
```

---

## JWT Payload Structure

### User Token
```javascript
{
  userId: "507f1f77bcf86cd799439011",
  role: "USER",
  iat: 1234567890,
  exp: 1234567890
}
```

### Admin Token
```javascript
{
  userId: "507f1f77bcf86cd799439012",
  role: "ADMIN",
  iat: 1234567890,
  exp: 1234567890
}
```
