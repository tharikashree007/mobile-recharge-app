# Testing Guide - Role-Based Authentication

## Quick Test Checklist

### 1. Admin Account Setup
```bash
cd backend
node seedAdmin.js
```
**Credentials**: admin@example.com / admin123

### 2. Test User Registration
- Go to: http://localhost:5173/register
- Create account → Should auto-login as USER
- Verify redirect to: `/user/home`

### 3. Test User Login
- Go to: http://localhost:5173/login
- Login with user credentials
- Should redirect to: `/user/home`
- Try admin credentials → Should fail

### 4. Test Admin Login
- Go to: http://localhost:5173/admin/login
- Login with admin credentials
- Should redirect to: `/admin/dashboard`
- Try user credentials → Should fail

### 5. Test Route Protection
- Logout
- Try accessing `/admin/dashboard` → Redirect to `/admin/login`
- Try accessing `/user/home` → Redirect to `/login`

### 6. Test Admin Features
- Login as admin
- Add a new plan
- Edit existing plan
- Delete a plan
- Change user role
- View statistics

### 7. Test API Security
```bash
# Without token
curl http://localhost:5000/api/admin/stats
# Should return 401

# With user token (get from login)
curl -H "Authorization: Bearer USER_TOKEN" http://localhost:5000/api/admin/stats
# Should return 403
```

## Expected Behaviors

| Action | USER | ADMIN |
|--------|------|-------|
| Signup at /register | ✅ Yes | ❌ No |
| Login at /login | ✅ Yes | ❌ No |
| Login at /admin/login | ❌ No | ✅ Yes |
| Access /user/home | ✅ Yes | ❌ No |
| Access /admin/dashboard | ❌ No | ✅ Yes |
| Recharge mobile | ✅ Yes | ❌ No |
| Manage plans | ❌ No | ✅ Yes |
| View all users | ❌ No | ✅ Yes |

## Test Credentials

### Admin
- Email: admin@example.com
- Password: admin123

### Test User (Create via /register)
- Any email/password you choose
- Role will be USER by default
