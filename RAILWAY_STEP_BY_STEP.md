# 🚀 Railway Deployment - Complete Step-by-Step Guide

## Overview

This guide will walk you through deploying your GRC Tool Online to Railway in about 30 minutes.

**What you'll deploy:**
- ✅ PostgreSQL Database
- ✅ Node.js Backend API
- ✅ React Frontend

---

## ⏱️ Timeline
- Account setup: 5 minutes
- Project creation: 5 minutes
- Database setup: 5 minutes
- Service configuration: 10 minutes
- Deployment: Automatic
- **Total: ~30 minutes**

---

## 📋 Prerequisites

Before you start, have ready:
- ✅ GitHub account (already done!)
- ✅ Your code pushed to GitHub (`karltperez/GRCTOOL`) ✅
- ✅ Railway account (free to create)
- ✅ 15-20 minutes of time

---

## 🎯 Step 1: Create Railway Account

### 1.1 Go to Railway
- Open https://railway.app in your browser
- Click **"Start Free"** or **"Sign Up"**

### 1.2 Choose Authentication Method
- **Recommended:** GitHub (easier for deployment)
- Click **"Continue with GitHub"**
- Authorize Railway to access your GitHub account

### 1.3 Create Organization (Optional)
- Railway may ask for organization name
- You can skip or enter a name
- Click **"Create"**

✅ **You now have a Railway account!**

---

## 🎯 Step 2: Create a New Project

### 2.1 Go to Railway Dashboard
- You'll be on the Railway dashboard
- Click **"+ New Project"** (or **"Create"**)

### 2.2 Choose Deployment Method
You'll see options:
- Deploy from GitHub
- Create from template
- Import from Heroku
- **Select: "Deploy from GitHub"**

### 2.3 Connect GitHub
- Click **"Configure GitHub App"** or **"Connect"**
- A window opens asking for permissions
- Click **"Authorize railway-app"**

### 2.4 Select Your Repository
- Look for **`GRCTOOL`** in the list
- Click on it
- Click **"Deploy Now"** or **"Select Repository"**

✅ **Railway is now analyzing your repo!**

---

## 🎯 Step 3: Configure PostgreSQL Database

### 3.1 Add PostgreSQL Service
In the Railway dashboard:
- Click **"Add Service"** or **"+"**
- Select **"Database"** → **"PostgreSQL"**
- Railway creates a PostgreSQL instance automatically

### 3.2 Get Database Credentials
Click on the PostgreSQL service:
- You'll see credentials generated
- **Copy the connection string** - you'll need it!
- Format: `postgresql://user:password@host:port/railway`

### 3.3 Configure Database Environment Variable
- Click on PostgreSQL service
- Go to **"Variables"** tab
- You'll see it creates a `DATABASE_URL` automatically
- ✅ Railway handles this for you!

✅ **PostgreSQL is ready!**

---

## 🎯 Step 4: Configure Backend Service

### 4.1 Add Backend Service
In Railway dashboard:
- Click **"Add Service"** or **"+"**
- Select **"GitHub Repo"**
- Select your **`GRCTOOL`** repo again
- Railway will auto-detect it has a Dockerfile

### 4.2 Set Root Directory to Backend
- Click the service settings
- Look for **"Root Directory"** or **"Deploy"** settings
- Change to: `backend` (without trailing slash)
- **Important:** Do NOT include `/` at the end (e.g., NOT `backend/`)
- Save and wait for redeploy

### 4.3 Add Environment Variables
Click on Backend service → **"Variables"** tab

Add these variables:

```
DATABASE_URL={copy from PostgreSQL service}
PORT=5000
NODE_ENV=production
JWT_SECRET=your_super_secret_key_change_this_to_something_random
FRONTEND_URL=https://your-frontend-url.railway.app
```

**For JWT_SECRET:** Generate a random string
```bash
# On your computer, run this to generate one:
openssl rand -base64 32
# Or just use: `supersecretkey123456789abcdefghij`
```

**For FRONTEND_URL:** Leave as placeholder for now, you'll update after frontend deploys

### 4.4 Configure Build & Deploy
- Click **Settings** tab on Backend service
- Scroll to **"Deploy"** section
- Verify **"Builder"** is set to: **"Dockerfile"** (NOT "Nixpacks")
- Verify **"Dockerfile"** path shows just: `Dockerfile`
- Click **Save**
- If you see "Dockerfile does not exist" error:
  - **Solution:** Make sure Root Directory is set to exactly `backend` (no slash)
  - Then click **"Redeploy"** button

### 4.5 View Backend Logs
- Click on service
- Go to **"Logs"** tab
- Watch as Railway builds your backend
- Should show: `🚀 Server running on port 5000`

✅ **Backend is deploying!**

---

## 🎯 Step 5: Configure Frontend Service

### 5.1 Add Frontend Service
- Click **"Add Service"** or **"+"**
- Select **"GitHub Repo"**
- Select **`GRCTOOL`** again

### 5.2 Set Root Directory to Frontend
- Click settings
- Set **"Root Directory"** to: `frontend` (without trailing slash)
- **Important:** Do NOT include `/` at the end (e.g., NOT `frontend/`)
- Save and wait for redeploy

### 5.3 Add Environment Variables
Click on Frontend service → **"Variables"** tab

Add this variable:

```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

**For Backend URL:** You'll get this from the Backend service
- Click Backend service
- Look for a public URL (something like: `https://grctool-backend-prod-xxxxx.railway.app`)
- Use: `https://[backend-url]/api`

### 5.4 Set Build & Deploy Settings
- Click **Settings** tab on Frontend service
- Scroll to **"Deploy"** section
- Verify **"Builder"** is set to: **"Dockerfile"** (NOT "Nixpacks")
- Verify **"Dockerfile"** path shows just: `Dockerfile`
- Click **Save**
- If you see "Dockerfile does not exist" error:
  - **Solution:** Make sure Root Directory is set to exactly `frontend` (no slash)
  - Then click **"Redeploy"** button

### 5.5 Watch Frontend Deploy
- Go to **"Logs"** tab
- Watch the build process
- Should complete in 2-3 minutes

✅ **Frontend is deploying!**

---

## 🎯 Step 6: Connect Services Together

### 6.1 Update Backend FRONTEND_URL
Your frontend now has a URL! Get it:
- Click Frontend service
- Look for **"Domain"** or **"Deployments"**
- Copy the public URL (e.g., `https://grctool-frontend-prod-xxxxx.railway.app`)

Update Backend environment variable:
- Go to Backend service → **"Variables"**
- Update **`FRONTEND_URL`** with your frontend URL
- Save

Backend will redeploy automatically ✅

### 6.2 Update Frontend REACT_APP_API_URL
Get your Backend URL:
- Click Backend service
- Copy the public URL (e.g., `https://grctool-backend-prod-xxxxx.railway.app`)

Update Frontend environment variable:
- Go to Frontend service → **"Variables"**
- Update **`REACT_APP_API_URL`** to: `https://[backend-url]/api`
- Save

Frontend will redeploy automatically ✅

✅ **Services are connected!**

---

## 🎯 Step 7: Initialize Database Schema

### 7.1 Connect to PostgreSQL
Railway provides a database client terminal:
- Click PostgreSQL service
- Look for **"Shell"** or **"Terminal"** button
- Click to open terminal

### 7.2 Run Schema Script
In the terminal, run:
```bash
psql $DATABASE_URL < backend/src/db/schema.sql
```

Or paste the contents of `backend/src/db/schema.sql` directly:

```sql
-- Copy and paste the entire schema.sql file contents here
-- Then press Enter
```

✅ **Database tables created!**

---

## ✅ Step 8: Verify Everything Works

### 8.1 Test Backend API
Open this URL in your browser:
```
https://[your-backend-url]/api/health
```

You should see:
```json
{
  "status": "ok",
  "timestamp": "2026-02-06T..."
}
```

✅ Backend is working!

### 8.2 Test Frontend
Open your frontend URL:
```
https://[your-frontend-url]
```

You should see the login page with:
- GRC Tool logo
- Login form
- "Register" link

✅ Frontend is loading!

### 8.3 Test User Registration
1. Click **"Register"**
2. Enter:
   - Email: `test@example.com`
   - Password: `Test@123`
   - Name: `Test User`
3. Click **"Sign Up"**
4. Should redirect to dashboard

✅ Backend & Frontend connected!

### 8.4 Test Project Creation
1. Click **"New Project"**
2. Enter:
   - Name: `Test Project`
   - Description: `Testing deployment`
3. Click **"Create"**
4. Should see project in list

✅ Database working!

---

## 🎯 Step 9: Monitor & Maintain

### 9.1 View Logs
Each service has logs to debug issues:
- Click service → **"Logs"** tab
- Watch for errors in real-time

### 9.2 View Metrics
- Click service → **"Metrics"** tab
- See CPU, memory, disk usage
- Monitor performance

### 9.3 Scale Resources
If needed later:
- Click service → **"Settings"**
- Increase memory/CPU allocation
- Railway charges accordingly

### 9.4 Enable Auto-Deploy
Railway auto-deploys when you push to GitHub:
1. Go to Backend service settings
2. Enable **"Auto-Deploy from GitHub"** ✅
3. Do the same for Frontend ✅
4. Now every `git push` auto-deploys!

---

## 📊 Your Live URLs

After deployment, you'll have:

```
Frontend:  https://[your-frontend-url].railway.app
Backend:   https://[your-backend-url].railway.app
Database:  PostgreSQL managed by Railway
```

**Share these with users or keep for your records!**

---

## 🐛 Troubleshooting

### Dockerfile "does not exist" error
**What you see:**
```
Dockerfile `Dockerfile` does not exist
```

**Why it happens:**
- Root Directory is set incorrectly
- Path includes trailing slash (e.g., `backend/` instead of `backend`)

**Fix:**
1. Click Backend service → Settings
2. Find "Root Directory" field
3. Change from `backend/` to `backend` (remove the slash)
4. Click Save
5. Click "Redeploy" button
6. Wait 2-3 minutes for rebuild

**Same fix for Frontend:**
1. Root Directory should be `frontend` (not `frontend/`)

---

### Backend won't start
**Check logs:**
- Service → Logs → Look for errors
- Common: Missing environment variables

**Fix:**
- Click Backend → Variables
- Verify all required variables are set
- Check DATABASE_URL is correct

### Frontend shows blank page
**Check logs:**
- Frontend → Logs → Look for build errors

**Fix:**
- Verify `REACT_APP_API_URL` is correct
- Redeploy frontend

### Can't register user
**Check:**
- Database connection
- Backend logs for errors
- Frontend console errors (F12 → Console)

**Fix:**
- Ensure schema.sql was run
- Check DATABASE_URL in backend

### Services can't communicate
**Check:**
- Frontend `REACT_APP_API_URL` uses correct backend URL
- Backend `FRONTEND_URL` uses correct frontend URL
- CORS is enabled in backend (it is!)

**Fix:**
- Update environment variables
- Redeploy both services

---

## 📝 Environment Variables Reference

### Backend Required
```
DATABASE_URL=postgresql://...  (from PostgreSQL)
PORT=5000
NODE_ENV=production
JWT_SECRET=random_secret_key
FRONTEND_URL=https://frontend-url.railway.app
```

### Frontend Required
```
REACT_APP_API_URL=https://backend-url.railway.app/api
```

### Optional (But Recommended)
```
# Backend
LOG_LEVEL=info

# Frontend
REACT_APP_ENV=production
```

---

## 🔐 Security Checklist

Before going live:

- [ ] JWT_SECRET is random & strong
- [ ] Database credentials are secure
- [ ] .env files NOT committed to Git ✅
- [ ] Environment variables set in Railway (not in code)
- [ ] Backend CORS configured ✅
- [ ] HTTPS enabled (Railway does this automatically) ✅
- [ ] API rate limiting considered
- [ ] Database backups enabled (Railway does this)

---

## 💰 Costs

Railway pricing (as of Feb 2026):
- **Free tier:** $5/month credits
- **Included:**
  - PostgreSQL database
  - Backend & Frontend hosting
  - 100GB bandwidth
  - SSL certificates

**Your costs should be FREE** with the $5 monthly credit!

---

## 🚀 Go Live!

Your GRC Tool Online is now:
- ✅ Deployed to Railway
- ✅ Connected to PostgreSQL
- ✅ Publicly accessible
- ✅ Auto-scales with demand
- ✅ Auto-updates on git push

---

## 📞 Need Help?

### Comprehensive Troubleshooting
- **See:** `RAILWAY_TROUBLESHOOTING.md` for detailed solutions to common issues
- **Coverage:** Dockerfile errors, build failures, connectivity issues, database problems, memory issues, and more

### Railway Support
- Railway Docs: https://docs.railway.app
- Community: https://railway.app/community
- Status: https://status.railway.app

### Your App Support
- Backend issues: See `backend/README.md`
- Frontend issues: See `frontend/README.md`
- General: See `README.md`

### Quick Reference
- Check logs: Service → Logs tab
- View metrics: Service → Metrics tab
- Update config: Service → Variables tab
- Troubleshooting: See `RAILWAY_TROUBLESHOOTING.md`

---

## ✨ Next Steps

1. ✅ Create Railway account
2. ✅ Deploy all services
3. ✅ Initialize database
4. ✅ Test your app
5. 📧 Share with others
6. 🎉 Start using your GRC Tool!

---

## 🎊 Congratulations!

Your **production-ready GRC Tool Online** is now live on Railway!

**Your app is available at:**
```
🌐 https://your-frontend-url.railway.app
```

**Share this with your team and start practicing GRC workflows!**

Happy deploying! 🚀
