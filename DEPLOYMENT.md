# Deployment Guide for Render

## Prerequisites
- GitHub repository: https://github.com/tharikashree007/mobile-recharge-app.git
- MongoDB Atlas account (for cloud database)
- Render account

## Step 1: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (replace `<password>` with your actual password)
5. Whitelist all IP addresses (0.0.0.0/0) for Render deployment

## Step 2: Deploy Backend on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository: `https://github.com/tharikashree007/mobile-recharge-app.git`
4. Configure the service:
   - **Name**: `mobile-recharge-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `master`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mobile-recharge?retryWrites=true&w=majority
   JWT_SECRET=your_secure_jwt_secret_key_here
   PORT=5000
   NODE_ENV=production
   ```

## Step 3: Deploy Frontend on Render
1. Create another Web Service
2. Configure:
   - **Name**: `mobile-recharge-frontend`
   - **Environment**: `Static Site`
   - **Branch**: `master`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-service-name.onrender.com
   ```

## Step 4: Update Frontend API Configuration
Update your frontend API calls to use the environment variable:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

## Step 5: Initialize Database
After deployment, run these commands via Render shell or create an endpoint:
1. Seed admin: `node seedAdmin.js`
2. Seed plans: `node seedPlans.js`

## Important Notes
- Free tier services may sleep after 15 minutes of inactivity
- First request after sleep may take 30+ seconds
- Consider upgrading to paid plans for production use
- Set up proper CORS configuration for your frontend domain

## Environment Variables Summary
### Backend (.env)
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=5000
NODE_ENV=production
```

### Frontend
```
VITE_API_URL=https://your-backend-service.onrender.com
```

## Default Admin Credentials
- Email: admin@example.com
- Password: admin123

Remember to change these in production!