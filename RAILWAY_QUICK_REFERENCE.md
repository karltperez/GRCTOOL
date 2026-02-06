# 🎯 Railway Deployment Quick Summary

## Your Complete Step-by-Step Guide is Ready!

📄 **Full Guide:** `RAILWAY_STEP_BY_STEP.md` (in your repo)

---

## ⚡ Quick Start (30 Minutes Total)

### **Step 1: Railway Account (5 min)**
1. Go to https://railway.app
2. Click "Start Free"
3. Sign up with GitHub
4. Authorize Railway

### **Step 2: Create Project (5 min)**
1. Dashboard → **"New Project"**
2. Select **"Deploy from GitHub"**
3. Connect & authorize GitHub
4. Select **`karltperez/GRCTOOL`** repo

### **Step 3: Add PostgreSQL (2 min)**
1. **"Add Service"** → **"Database"** → **"PostgreSQL"**
2. Railway creates it automatically ✅
3. Copy connection string for later

### **Step 4: Deploy Backend (10 min)**
1. **"Add Service"** → **"GitHub Repo"** → Select repo
2. Set **"Root Directory"** to: `backend`
3. Add Environment Variables:
   ```
   DATABASE_URL={from PostgreSQL}
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=your_random_secret_key
   FRONTEND_URL=https://your-frontend.railway.app
   ```
4. Railway auto-deploys via Dockerfile ✅

### **Step 5: Deploy Frontend (8 min)**
1. **"Add Service"** → **"GitHub Repo"** → Select repo
2. Set **"Root Directory"** to: `frontend`
3. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend.railway.app/api
   ```
4. Railway auto-deploys via Dockerfile ✅

### **Step 6: Initialize Database (3 min)**
1. Click PostgreSQL service
2. Open **"Shell"** terminal
3. Run:
   ```bash
   psql $DATABASE_URL < backend/src/db/schema.sql
   ```

### **Step 7: Test (2 min)**
1. Visit frontend URL → Should see login page ✅
2. Visit backend URL/api/health → Should see OK response ✅
3. Register a test user ✅
4. Create a test project ✅

### **Step 8: Connect Services (2 min)**
1. Get your backend URL from Backend service
2. Update Frontend: `REACT_APP_API_URL=https://backend-url/api`
3. Get your frontend URL from Frontend service
4. Update Backend: `FRONTEND_URL=https://frontend-url`
5. Both redeploy automatically ✅

---

## 🎯 Key Railway Tips

- **Auto-deploys:** Push to GitHub → Auto deploys!
- **Logs:** Service → Logs tab (watch deployment)
- **Environment Variables:** Service → Variables tab
- **Monitoring:** Service → Metrics tab
- **Free:** $5/month credits cover everything

---

## 🔑 Important Environment Variables

### Backend (Must Set)
```
DATABASE_URL=postgresql://...
PORT=5000
NODE_ENV=production
JWT_SECRET=random_secure_key
FRONTEND_URL=https://your-frontend.railway.app
```

### Frontend (Must Set)
```
REACT_APP_API_URL=https://your-backend.railway.app/api
```

---

## ✅ Deployment Checklist

- [ ] Railway account created
- [ ] Project created
- [ ] PostgreSQL added
- [ ] Backend deployed (check logs)
- [ ] Frontend deployed (check logs)
- [ ] Database schema initialized
- [ ] Backend URL working (/api/health)
- [ ] Frontend URL loading
- [ ] Can register user
- [ ] Can create project
- [ ] Services connected

---

## 🚀 After Deployment

Your app is live at:
```
Frontend: https://your-frontend-url.railway.app
Backend:  https://your-backend-url.railway.app
```

### Auto-Deploy for Future Changes
Just push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
# Railway auto-deploys! ✅
```

---

## 🐛 Troubleshooting Quick Links

**Backend won't deploy?**
→ Check Backend service Logs

**Frontend shows blank?**
→ Check Frontend service Logs, verify API URL

**Can't register users?**
→ Check Database connection, verify schema was created

**Services can't talk to each other?**
→ Verify environment variables have correct URLs

---

## 📖 Full Guide

For complete details, see:
→ **`RAILWAY_STEP_BY_STEP.md`**

It has:
- ✅ Screenshots tips
- ✅ Detailed troubleshooting
- ✅ Security checklist
- ✅ Cost information
- ✅ Monitoring guide

---

## 🎊 You're Ready!

Your GitHub repo is ready to deploy. Follow the steps above and your GRC Tool will be live in 30 minutes!

**Questions?** Check the full guide: `RAILWAY_STEP_BY_STEP.md`

Happy deploying! 🚀
