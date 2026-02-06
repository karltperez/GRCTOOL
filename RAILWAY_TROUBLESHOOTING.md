# 🚨 Railway Deployment Troubleshooting Guide

## Common Issues & Solutions

### Issue 1: "Dockerfile `Dockerfile` does not exist"

**What's happening:**
Railway can't find the Dockerfile in the service's root directory.

**Why it happens:**
- Root directory not set correctly
- Dockerfile name is wrong
- Railway looking in wrong location

**How to fix:**

#### Solution A: Set Root Directory Correctly (RECOMMENDED)

1. In Railway dashboard, click the service (Backend or Frontend)
2. Go to **Settings** tab
3. Scroll to **"Deploy"** section
4. Find **"Root Directory"** field
5. **For Backend service:** Set to `backend` (not `backend/`)
6. **For Frontend service:** Set to `frontend` (not `frontend/`)
7. Click **Save**
8. Redeploy the service

#### Solution B: Rebuild from GitHub

If Solution A doesn't work:

1. Click the service
2. Go to **Deployments** tab
3. Find the failed deployment
4. Click **"Redeploy"** button
5. Wait 2-3 minutes for rebuild

#### Solution C: Force Rebuild

1. Click the service
2. Go to **Settings** tab
3. Scroll down to **"Advanced"** section
4. Find **"Build Command"** or **"Builder"**
5. Ensure it says **"Dockerfile"** (not "Nixpacks" or "Heroku")
6. Click **"Rebuild"** button

---

### Issue 2: Build Fails - "npm ERR!"

**What's happening:**
npm install fails during Docker build.

**Common causes:**
- Missing `package-lock.json`
- Network timeout
- Incompatible node version

**How to fix:**

1. **Check package.json exists:**
   ```bash
   # In backend folder
   ls -la backend/package.json
   
   # In frontend folder
   ls -la frontend/package.json
   ```

2. **Regenerate package-lock.json locally:**
   ```bash
   cd backend
   rm package-lock.json
   npm install
   cd ..
   
   cd frontend
   rm package-lock.json
   npm install
   cd ..
   ```

3. **Push to GitHub:**
   ```bash
   git add backend/package-lock.json frontend/package-lock.json
   git commit -m "Regenerate package-lock files"
   git push
   ```

4. **Redeploy in Railway:**
   - Click service → Deployments
   - Click Redeploy

---

### Issue 3: Service Starts Then Crashes

**Error in logs:** `Server is running but then exits`

**Possible causes:**
- Missing environment variables
- Database connection fails
- Port already in use

**How to fix:**

#### Check Environment Variables

1. Click the service (Backend or Frontend)
2. Go to **Variables** tab
3. Verify these are set:

**For Backend:**
- [ ] `DATABASE_URL` (from PostgreSQL service)
- [ ] `PORT=5000`
- [ ] `NODE_ENV=production`
- [ ] `JWT_SECRET=<random_string>`
- [ ] `FRONTEND_URL=<frontend_url>`

**For Frontend:**
- [ ] `REACT_APP_API_URL=<backend_url>/api`

4. If any are missing, add them
5. Click **Save** - service will redeploy

#### Check Database Connection

1. Click PostgreSQL service
2. Go to **Logs** tab
3. Verify it says "ready to accept connections"

If PostgreSQL is down:
- Click service
- Click **Deploy** to restart it

#### Check Backend Logs

1. Click Backend service
2. Go to **Logs** tab
3. Look for error messages
4. Common errors:
   - `ECONNREFUSED` = Can't connect to database
   - `ENOMEM` = Out of memory (need more resources)
   - `Error: listen EADDRINUSE` = Port conflict

---

### Issue 4: Frontend Won't Load (Blank Page)

**What you see:**
- Browser shows blank page
- No error message

**Causes:**
- Frontend not deployed
- API URL wrong
- React build failed

**How to fix:**

1. **Check Frontend deployed:**
   - Click Frontend service
   - Go to Deployments tab
   - Look for green checkmark (success)
   - If red X, click Redeploy

2. **Verify API URL:**
   - Click Frontend service
   - Go to Variables tab
   - Check `REACT_APP_API_URL`
   - Should be: `https://[backend-url]/api`
   - Example: `https://grctool-backend-prod-xxx.railway.app/api`

3. **Open browser console:**
   - Right-click → Inspect (or F12)
   - Go to Console tab
   - Look for red errors
   - Common: "Failed to fetch from [url]"

4. **Check CORS:**
   - Backend needs CORS enabled
   - Look for `cors` configuration in backend code
   - Already enabled in our code ✅

---

### Issue 5: Can't Register Users (Database Error)

**Error:** "Error creating user" or "Database error"

**Causes:**
- Database tables not created
- DATABASE_URL wrong
- User already exists

**How to fix:**

#### Initialize Database Schema

1. Click PostgreSQL service
2. Go to **Data** tab
3. Look for **"SQL Editor"** or **"Query"** button
4. Copy the entire contents of `backend/src/db/schema.sql`
5. Paste into SQL editor
6. Click **"Execute"** or **"Run"**

If SQL Editor not available:

1. Click PostgreSQL service
2. Go to **Plugins** tab
3. Look for **"Connect"** button or terminal
4. In terminal, run:
   ```sql
   CREATE TABLE IF NOT EXISTS users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     name VARCHAR(255),
     created_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE TABLE IF NOT EXISTS projects (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE TABLE IF NOT EXISTS assets (
     id SERIAL PRIMARY KEY,
     project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
     name VARCHAR(255) NOT NULL,
     category VARCHAR(100),
     risk_level VARCHAR(50),
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

---

### Issue 6: Services Can't Communicate

**Error:** Frontend API calls fail with "Network Error" or "Failed to fetch"

**Causes:**
- Backend URL wrong in Frontend
- Backend service not running
- CORS not enabled
- Firewall blocking requests

**How to fix:**

1. **Get correct backend URL:**
   - Click Backend service
   - Go to **Deployments** tab
   - Find "Domain" or "Public URL"
   - Should be: `https://grctool-backend-prod-xxxxx.railway.app`

2. **Update Frontend variable:**
   - Click Frontend service
   - Variables tab
   - Set `REACT_APP_API_URL=https://[backend-url]/api`
   - Click Save

3. **Verify Backend running:**
   - Click Backend service
   - Go to Logs tab
   - Look for `🚀 Server running on port 5000`

4. **Test backend directly:**
   - Open browser
   - Visit: `https://[backend-url]/api/health`
   - Should see: `{"status":"ok","timestamp":"..."}`

5. **Check CORS in logs:**
   - If CORS error in browser console
   - Check Backend Logs for CORS messages
   - Verify backend has `cors()` enabled

---

### Issue 7: Memory/Resource Issues

**Errors:**
- "JavaScript heap out of memory"
- "Service crashes randomly"
- "Build takes too long"

**How to fix:**

1. **Increase Memory:**
   - Click service
   - Go to Settings
   - Find "Memory" or "Resources"
   - Increase from default (512MB) to 1GB or more
   - Click Save

2. **Optimize Build:**
   - Check npm install isn't failing
   - Verify package.json dependencies are needed
   - Remove unused packages

3. **Check Logs:**
   - Click service → Logs
   - Look for memory warnings
   - Consider splitting services if still failing

---

### Issue 8: 502 Bad Gateway Error

**What you see:**
- Browser shows: "502 Bad Gateway" or "Service Unavailable"

**Causes:**
- Backend crashed
- Database connection lost
- Network timeout

**How to fix:**

1. **Check Backend service:**
   - Click Backend service
   - Go to Logs tab
   - Look for crash messages
   - Redeploy if needed

2. **Check PostgreSQL:**
   - Click PostgreSQL service
   - Verify status is "Running"
   - Check logs for connection issues

3. **Wait and retry:**
   - Railway auto-restarts failed services
   - Wait 30 seconds, then refresh browser

4. **Force redeploy:**
   - Click Backend service
   - Go to Deployments
   - Click Redeploy button

---

## Quick Diagnostic Checklist

When something's not working, check these in order:

- [ ] All 3 services deployed (Backend, Frontend, PostgreSQL)
- [ ] All services show "Running" status (green)
- [ ] All environment variables set correctly
- [ ] PostgreSQL database initialized (tables created)
- [ ] Backend logs show "Server running on port 5000"
- [ ] Frontend logs show successful build
- [ ] Can access frontend URL in browser
- [ ] Can access backend `/api/health` endpoint
- [ ] Frontend `REACT_APP_API_URL` is correct
- [ ] Backend `FRONTEND_URL` is correct
- [ ] Backend `DATABASE_URL` is correct

---

## Getting Help

### Check Logs First
1. Click service → **Logs** tab
2. Scroll to bottom for most recent errors
3. Copy the error message

### Railway Support
- **Docs:** https://docs.railway.app
- **Status:** https://status.railway.app
- **Community:** https://railway.app/community

### Our Application Support
- Backend code issues: `backend/README.md`
- Frontend code issues: `frontend/README.md`
- General questions: `README.md`

---

## Emergency Fixes

### Quick Reboot All Services
```bash
# In Railway CLI (if installed):
railway redeploy
```

Or manually:
1. Click Backend service → Deployments → Redeploy
2. Click Frontend service → Deployments → Redeploy
3. Click PostgreSQL service → Deployments → Redeploy
4. Wait 5 minutes for all to complete

### Nuclear Option: Start Fresh
If nothing works:

1. Delete all services (not the repo)
2. Click "Add Service" → Deploy from GitHub again
3. Start from Step 3 of RAILWAY_STEP_BY_STEP.md

---

## Success Indicators

You'll know it's working when:

✅ **Backend:**
- Service status: "Running" (green)
- Logs show: `🚀 Server running on port 5000`
- URL `/api/health` returns `{"status":"ok"}`

✅ **Frontend:**
- Service status: "Running" (green)
- Logs show: `Ready to accept connections`
- URL loads login page in browser

✅ **Database:**
- Service status: "Running" (green)
- Logs show: `database system is ready to accept connections`

✅ **Connectivity:**
- Can register new user
- Can create projects
- Can add assets to projects
- All data persists after refresh

---

Happy deploying! 🚀
