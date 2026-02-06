# 🚨 Railway Troubleshooting: When Things Don't Work

Don't panic! This happens to everyone. Let's fix it together.

---

## Common Problems & How to Fix Them

### Problem 1: "Dockerfile `Dockerfile` does not exist"

**What you're seeing:**
```
[Region: asia-southeast1]
Dockerfile `Dockerfile` does not exist
```

**What's going on:**
Railway is looking for your Dockerfile but can't find it. Usually this means the Root Directory is configured wrong—maybe with a trailing slash where there shouldn't be one.

**The Fix (Try This First):**

1. Click on the service that's complaining (Backend or Frontend)
2. Go to **Settings** tab
3. Find the **"Root Directory"** field
4. Make sure it says `backend` (or `frontend` for the frontend)—no slash at the end!
5. Click **Save**
6. Go to **Deployments** and click **"Redeploy"**
7. Wait 2-3 minutes and it should work

**If that doesn't work:**

1. Go to **Settings** → **"Deploy"** section
2. Check that **"Builder"** is set to `Dockerfile` (not Nixpacks)
3. Click **Save** and **Redeploy**

---

### Problem 2: Your npm Install Is Failing

**What you're seeing:**
Build logs show something like:
```
npm ERR! code ERESOLVE
```

**What's going on:**
Your dependencies aren't installing correctly. This could be because of conflicting packages or corrupted `package-lock.json`.

**The Fix:**

1. On your computer, go into each folder and regenerate the lock files:
   ```bash
   cd backend
   rm package-lock.json
   npm install
   
   cd ../frontend
   rm package-lock.json
   npm install
   ```

2. Commit and push to GitHub:
   ```bash
   git add package-lock.json
   git commit -m "Regenerate lock files"
   git push
   ```

3. In Railway, click **Redeploy** and try again

---

### Problem 3: Your App Starts But Then Crashes Immediately

**What you're seeing:**
Logs say "Server starting..." but then the service stops.

**What's going on:**
Usually missing environment variables or a database connection problem.

**The Fix:**

1. Click on the service and go to **Variables** tab
2. Check that ALL of these are set:

   **For Backend:**
   - `DATABASE_URL` (should look like `postgresql://...`)
   - `PORT=5000`
   - `NODE_ENV=production`
   - `JWT_SECRET=something_secret`
   - `FRONTEND_URL=your_frontend_url`

   **For Frontend:**
   - `REACT_APP_API_URL=your_backend_url/api`

3. If any are missing, add them
4. Click **Save** - it'll redeploy automatically

**If you're still seeing crashes:**
- Check the Logs tab for specific error messages
- Look for anything about database connection (`ECONNREFUSED` usually means it can't find the database)

---

### Problem 4: Frontend Loads But Shows a Blank Page

**What you're seeing:**
You visit the frontend URL and see a white/blank page. No error messages.

**What's going on:**
Usually your frontend built okay, but it can't reach the backend API.

**The Fix:**

1. Open your browser's Developer Tools (F12 or right-click → Inspect)
2. Go to the **Console** tab
3. You'll probably see an error like "Failed to fetch from..."
4. That error message tells you the URL it's trying to reach
5. Compare that URL to your actual Backend URL

**To fix it:**
1. Click on your Frontend service in Railway
2. Go to **Variables**
3. Update `REACT_APP_API_URL` to your actual backend URL (with `/api` at the end)
4. Click **Save**
5. Refresh the frontend in your browser

---

### Problem 5: You Can't Register Users (Database Error)

**What you're seeing:**
Error message like "Database error" or "Error creating user"

**What's going on:**
Either your database isn't set up with the right tables, or the connection isn't working.

**The Fix:**

1. First, make sure your database is actually running. Click on PostgreSQL service and check the status (should be green/Running)

2. If it's running, the tables probably aren't created. Go to PostgreSQL service and click **"Shell"** or **"Terminal"**

3. Paste this entire script and hit Enter:
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

4. That should create your tables. Try registering again!

---

### Problem 6: Frontend and Backend Can't Talk

**What you're seeing:**
Frontend works, backend works, but they can't communicate. Errors like "Failed to fetch" or "Network Error"

**What's going on:**
The URLs don't match up. Your frontend is looking for the backend in the wrong place.

**The Fix:**

1. Get your Backend's actual public URL:
   - Click Backend service
   - Look at the **"Deployments"** tab or **"Settings"**
   - Copy the domain (it'll be something like `https://grctool-backend-prod-xxxxx.railway.app`)

2. Update your Frontend:
   - Click Frontend service → **Variables**
   - Change `REACT_APP_API_URL` to `https://[your-backend-url]/api`
   - Click **Save**

3. Get your Frontend's public URL and do the same for your Backend:
   - Click Frontend service
   - Copy the domain
   - Go to Backend service → **Variables**
   - Update `FRONTEND_URL` to your frontend domain
   - Click **Save**

4. Both services will redeploy automatically. Give them a minute or two.

---

### Problem 7: Out of Memory or Service Keeps Restarting

**What you're seeing:**
"JavaScript heap out of memory" or your service just keeps restarting randomly

**What's going on:**
Your app needs more memory than it's allocated.

**The Fix:**

1. Click the service that's having trouble
2. Go to **Settings**
3. Look for **"Memory"** or **"Resources"**
4. Increase it from 512MB to 1GB
5. Click **Save**
6. Redeploy

This will help, though it might cost you a tiny bit. But you're still within the free tier!

---

### Problem 8: Getting a 502 Bad Gateway Error

**What you're seeing:**
Browser shows: "502 Bad Gateway" or "Service Unavailable"

**What's going on:**
Your backend crashed or the database went down.

**The Fix:**

1. **Check the Backend:**
   - Click Backend service → **Logs**
   - Look for crash messages or errors
   - If it crashed, Railway usually restarts it automatically

2. **Check the Database:**
   - Click PostgreSQL service
   - Make sure it says "Running" (green)
   - Check logs for connection issues

3. **Wait and refresh:**
   - Give it 30 seconds
   - Refresh your browser
   - It often fixes itself

4. **If it's still broken:**
   - Click the service → **Deployments**
   - Click **"Redeploy"** manually
   - Wait 2-3 minutes

---

## Debugging Checklist

When something's weird, go through this in order:

- [ ] All 3 services deployed (Backend, Frontend, PostgreSQL)?
- [ ] All services showing "Running" status (green)?
- [ ] All environment variables set correctly?
- [ ] Database tables created (did you run schema.sql)?
- [ ] Backend logs showing "Server running on port 5000"?
- [ ] Frontend logs showing successful build?
- [ ] Can access frontend URL in browser?
- [ ] Can access backend `/api/health` endpoint?
- [ ] Frontend's `REACT_APP_API_URL` is correct?
- [ ] Backend's `DATABASE_URL` is correct?
- [ ] Backend's `FRONTEND_URL` is correct?

---

## Getting Help

### When Checking Logs

Every service has a **"Logs"** tab where you can see what's happening:
1. Click the service
2. Click **"Logs"**
3. Scroll to the bottom for the most recent messages
4. Look for red text or error messages
5. That usually tells you exactly what's wrong!

### Railway's Official Resources

- **Railway Docs:** https://docs.railway.app (super helpful!)
- **Status Page:** https://status.railway.app (check if Railway is down)
- **Community:** https://railway.app/community (real people helping)

### For Your Code Specifically

- Backend issues? Check `backend/README.md`
- Frontend issues? Check `frontend/README.md`
- General questions? Check `README.md`

---

## The Nuclear Option: Start Over

If nothing is working and you can't figure it out:

1. Delete all the services (not your GitHub repo!)
2. Follow the steps in `RAILWAY_STEP_BY_STEP.md` again
3. Railway is just deploying your code—if you follow the steps carefully, it'll work

The beauty of deploying from GitHub is that you can always start fresh. Your code is safe!

---

## Success Looks Like This

If everything's working:

✅ **Backend:**
- Status: "Running" (green)
- Logs show: `🚀 Server running on port 5000`
- URL `/api/health` returns `{"status":"ok"}`

✅ **Frontend:**
- Status: "Running" (green)
- Logs show: `Ready to accept connections`
- URL loads the login page

✅ **Database:**
- Status: "Running" (green)
- Logs show: `database system is ready to accept connections`

✅ **The Whole App:**
- You can register a user
- You can create projects
- You can add assets
- Everything saves and shows up when you refresh

If you've got all these checkmarks, you're golden! 🎉
