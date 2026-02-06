# 🚀 Railway Deployment - Your Complete Guide

## Let's Get Your App Live!

Ready to see your GRC Tool Online running on the internet? Great! This guide will walk you through the whole process—it's easier than you think and should take about 30 minutes from start to finish.

**Here's what we're setting up:**
- ✅ A real PostgreSQL database (so your data actually persists)
- ✅ Your backend API running on the cloud
- ✅ Your React frontend accessible to anyone with the link

---

## ⏱️ How Long This Takes

Don't worry—you've got this! Here's the breakdown:
- Getting your Railway account: 5 minutes
- Creating the project in Railway: 5 minutes
- Setting up the database: 5 minutes
- Configuring your services: 10 minutes
- Waiting for deployment: a few minutes (Railway does this automatically)
- **Total: ~30 minutes** (and most of that is just watching things deploy!)

---

## ✅ What You Need

Before we jump in, make sure you have:
- ✅ A GitHub account (you've already got this!)
- ✅ Your code pushed to GitHub at `karltperez/GRCTOOL` (done! ✅)
- ✅ About 20 minutes of free time
- ✅ A Railway account (we'll create this in Step 1—it's free!)

---

## 🎯 Step 1: Set Up Your Railway Account

Let's start with the basics. Don't worry—this is super straightforward!

### 1.1 Head Over to Railway
Open your browser and go to **https://railway.app**. You'll see a clean homepage with a "Start Free" button. Click it!

### 1.2 Connect with GitHub
Railway will ask how you want to sign up. Pick **"Continue with GitHub"** (it's the easiest option and means you won't need another password to remember).

Then just authorize Railway to access your GitHub account. It's asking for permission so it can automatically pull your code when it's time to deploy. Pretty handy!

### 1.3 Optional: Name Your Organization
Railway might ask you to create an organization. You can give it a cool name, or just skip it—either way is fine. For now, just click through and get to the dashboard.

✅ **Boom! You're now a Railway user!**

---

## 🎯 Step 2: Create a New Project in Railway

Now you're on the Railway dashboard. Let's create a new project for your GRC Tool!

### 2.1 Start a New Project
Look for the **"+ New Project"** button (it's pretty obvious) and click it.

### 2.2 Choose How to Deploy
Railway will give you a few options. You want **"Deploy from GitHub"** since your code is already up there. Click that option.

### 2.3 Let Railway Connect to GitHub
Railway will ask for permission to connect to your GitHub account (if it hasn't already). This is so it can access your code. Just click **"Authorize railway-app"** and you're good.

### 2.4 Pick Your Repository
Now the good part—select the **`GRCTOOL`** repository from the list. Once you click on it, you can hit **"Deploy Now"** to move forward.

✅ **Done! Railway is now checking out your code.**

---

## 🎯 Step 3: Set Up Your Database

Your app needs a place to store data. Let's set up PostgreSQL—think of it as the filing cabinet for your GRC Tool.

### 3.1 Add a PostgreSQL Database
In your Railway project, look for **"Add Service"** or the **"+"** button. Click it, then select **"Database"** → **"PostgreSQL"**. 

That's it! Railway will automatically spin up a database instance for you. No complicated configuration needed.

### 3.2 Copy Your Database Connection String
Click on the PostgreSQL service and you'll see Railway has automatically created credentials for you. It'll look something like:
```
postgresql://user:password@host:port/railway
```

Don't worry about copying this manually—Railway is smart enough to handle the heavy lifting.

### 3.3 Let Railway Do the Magic
Go to the **"Variables"** tab in the PostgreSQL service. You'll see that Railway has already created a `DATABASE_URL` environment variable. It's basically Railway saying, "I've got this covered for you!"

✅ **Your database is ready to go!**

---

## 🎯 Step 4: Deploy Your Backend

Now let's get your Node.js backend running. This is where the API magic happens!

### 4.1 Add Your Backend Service
Click **"Add Service"** again, then select **"GitHub Repo"**. Pick your `GRCTOOL` repo one more time. Railway will automatically detect that you have a Dockerfile—nice!

### 4.2 Tell Railway Where Your Backend Is
Here's the key part: click into the service settings and find the **"Root Directory"** field. Type `backend` (just `backend`—no slash at the end like `backend/`).

This tells Railway, "Hey, the backend code is in the `backend` folder." Save it and let Railway redeploy.

### 4.3 Add Your Environment Variables
Now click on the Backend service and go to **"Variables"** tab. You're going to add a few things here:

```
DATABASE_URL={paste the connection string from PostgreSQL}
PORT=5000
NODE_ENV=production
JWT_SECRET=something_random_and_secret
FRONTEND_URL=https://your-frontend-url.railway.app
```

**Quick note on JWT_SECRET:** This is like a secret password for your tokens. Just generate something random. You can run this on your computer if you want:
```bash
openssl rand -base64 32
```
Or honestly, just use something like `my_super_secret_key_12345` for now. (Change it later in production!)

**About FRONTEND_URL:** You don't have the frontend URL yet, so just put a placeholder like `https://frontend.railway.app`. We'll come back and update this in a few minutes.

### 4.4 Make Sure the Build Settings Are Right
Click **Settings** on the Backend service, scroll down to **"Deploy"**, and verify that:
- The **"Builder"** is set to `Dockerfile` (not "Nixpacks")
- It's looking for just `Dockerfile` (not a complicated path)
- Click **Save**

**Heads up:** If you see an error about "Dockerfile not found," it's probably because the Root Directory got set with a trailing slash. Just go back and remove that slash. It happens!

### 4.5 Watch the Magic Happen
Click on **"Logs"** and watch your backend build. You should see Railway pulling your code, installing dependencies, and then—boom—you'll see:
```
🚀 Server running on port 5000
```

That's your cue that it worked!

✅ **Your backend is live!**

---

## 🎯 Step 5: Deploy Your Frontend

Time to get your React app running! Your users are going to see this beautiful interface you built.

### 5.1 Add Your Frontend Service
Click **"Add Service"**, select **"GitHub Repo"**, and pick `GRCTOOL` one more time. You're a pro at this now!

### 5.2 Set the Root Directory
Just like with the backend, click into settings and set **"Root Directory"** to `frontend` (no trailing slash!). Save it.

### 5.3 Tell Your Frontend Where the Backend Is
Now for the Variables tab. You need to add one variable that tells your React app where to find the backend API:

```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

Where do you get the backend URL? Easy—click on your Backend service and copy the public URL from the Deployments tab. It'll look like `https://grctool-backend-prod-xxxxx.railway.app`. Just add `/api` to the end.

### 5.4 Check the Build Settings
Again, click **Settings**, scroll to **"Deploy"**, and make sure:
- **"Builder"** is set to `Dockerfile`
- It's looking for `Dockerfile` (no slash at the end)
- Click **Save**

Same deal as the backend—if you get a Dockerfile error, just remove any trailing slash from the Root Directory.

### 5.5 Let It Build
Click **"Logs"** and watch your frontend build. It usually takes 2-3 minutes. When it's done, you'll have a public URL you can actually visit!

✅ **Your frontend is online!**

---

## 🎯 Step 6: Make Your Services Talk to Each Other

Now that both services are running, they need to know where each other are. Think of it like giving them each other's phone numbers.

### 6.1 Give Your Backend the Frontend's URL
Your frontend now has a public URL! Go grab it:
- Click on the Frontend service
- Look for the **"Domain"** or find it in **"Deployments"**
- Copy that public URL (it'll be something like `https://grctool-frontend-prod-xxxxx.railway.app`)

Now head to your Backend service → **"Variables"** and update the `FRONTEND_URL` variable with this URL. Hit Save, and Railway will automatically redeploy your backend with this new info.

### 6.2 Give Your Frontend the Backend's URL
Similarly, grab your Backend's public URL:
- Click Backend service
- Copy the public URL (e.g., `https://grctool-backend-prod-xxxxx.railway.app`)

Go to Frontend service → **"Variables"** and update `REACT_APP_API_URL` to `https://[backend-url]/api`. Save it, and your frontend will redeploy.

✅ **Your services are now connected and talking!**

---

## 🎯 Step 7: Set Up Your Database Tables

Your database is running, but it's empty. We need to create the tables where your data will live.

### 7.1 Open the Database Terminal
Click on your PostgreSQL service in Railway. Look for a **"Shell"** or **"Terminal"** button and click it. This opens a terminal where you can talk directly to your database.

### 7.2 Create Your Tables
In the terminal, you can run the setup script. If you want to be fancy, run:
```bash
psql $DATABASE_URL < backend/src/db/schema.sql
```

Or if that doesn't work, just copy the entire contents of `backend/src/db/schema.sql` (it's in your repository) and paste it into the terminal. Hit Enter, and boom—your tables are created!

✅ **Your database is ready to store data!**

---

## ✅ Step 8: Test Your App (The Fun Part!)

Let's make sure everything is actually working. Time to play with your new app!

### 8.1 Test Your Backend API
Open your browser and visit:
```
https://[your-backend-url]/api/health
```

If all is well, you should see something like:
```json
{
  "status": "ok",
  "timestamp": "2026-02-06T..."
}
```

If you see this, your backend is definitely alive and well!

### 8.2 Visit Your Frontend
Now go to your frontend URL and you should see your login page. Pretty cool, right? Your app is literally on the internet right now!

### 8.3 Create a Test User
Let's actually use the app:
1. Click **"Register"**
2. Sign up with something like:
   - Email: `test@example.com`
   - Password: `Test@123`
   - Name: `Test User`
3. Click **"Sign Up"** and you should be logged in!

If you see the dashboard, congratulations—your frontend and backend are talking!

### 8.4 Try Creating a Project
Now let's actually use the app:
1. Click **"New Project"**
2. Enter:
   - Name: `My First GRC Project`
   - Description: `It works!`
3. Click **"Create"**

If you see your project appear in the list, your database is working too! Everything is connected and working!

✅ **Your app is live and working!**

---

## 🎯 Step 9: Keep Your App Running Smoothly

### 9.1 Check the Logs When Something Goes Wrong
Each service has a **"Logs"** tab where you can see what's happening behind the scenes. If something ever breaks, that's where the clues are.

### 9.2 Watch Your Performance
Click on any service and go to **"Metrics"** to see CPU, memory, and other stats. It's like the health dashboard for your app.

### 9.3 Need More Power Later?
If your app gets really popular and needs more resources, you can increase memory/CPU in the **"Settings"** tab. Railway will charge you based on usage, but you get $5/month free credit.

### 9.4 Set Up Auto-Deploy (This Is Cool!)
Want your app to automatically update every time you push code to GitHub? Go to each service's Settings and enable **"Auto-Deploy from GitHub"**. Now whenever you do `git push`, your app updates automatically. No manual deployment needed!

---

## 📊 Your New Public URLs

Once everything is running, you'll have live URLs for everything:

```
🌐 Frontend:  https://[your-frontend-url].railway.app
🔧 Backend:   https://[your-backend-url].railway.app
💾 Database:  PostgreSQL (managed by Railway)
```

**Save these somewhere! You can share the frontend URL with people who want to use your app.**

---

## 🆘 Something Not Working? Here's Help!

### Dockerfile Error (The "Does Not Exist" Thing)
**You'll see:** 
```
Dockerfile `Dockerfile` does not exist
```

**What's going on:** You probably have a trailing slash in your Root Directory (like `backend/` instead of `backend`).

**The fix:** 
1. Click the service that's having trouble → **Settings**
2. Find **"Root Directory"**
3. Remove any trailing slash (should be `backend` or `frontend`, not `backend/` or `frontend/`)
4. Click **Save** and then **Redeploy**
5. Give it 2-3 minutes to rebuild

---

### Backend won't start
**Check logs:**
- Service → Logs → Look for errors
- Common: Missing environment variables

**Fix:**
- Click Backend → Variables
- Verify all required variables are set
- Check DATABASE_URL is correct

### Frontend Shows a Blank Page
This usually means your frontend built, but it can't find the backend.

**Quick fix:**
- Go to Frontend service → **Variables**
- Double-check that `REACT_APP_API_URL` points to your actual backend URL
- Make sure it has `/api` at the end
- Click **Save** (it'll redeploy automatically)

### Can't Register or Create Projects
This usually means your database isn't set up right.

**What to check:**
- Did you run the schema.sql script? (See Step 7 again)
- Is your `DATABASE_URL` correct in the Backend variables?
- Check the Backend Logs for any error messages

**The fix:**
- Go back to your PostgreSQL service and make sure the database tables were created
- If not, run that schema script again

### Frontend and Backend Can't Talk
Your frontend is trying to reach your backend but can't find it.

**What to check:**
- Frontend's `REACT_APP_API_URL` should match your Backend's actual URL
- Backend's `FRONTEND_URL` should match your Frontend's actual URL
- Both should be the full public URLs (starting with `https://`)

**The fix:**
- Update the Variables to the correct URLs
- Both services will redeploy automatically

---

## 📝 Quick Reference: Your Environment Variables

Here's a cheat sheet of what goes where:

### Backend Service Needs These:
```
DATABASE_URL=postgresql://...  (Railway creates this automatically)
PORT=5000                       (Always 5000)
NODE_ENV=production             (So it runs in production mode)
JWT_SECRET=your_secret_here     (Make this random and unique)
FRONTEND_URL=https://...        (Your frontend's public URL)
```

### Frontend Service Needs This:
```
REACT_APP_API_URL=https://backend-url.railway.app/api
```

That's it! These are the essentials to get your app talking to each other.

---

## 🔐 A Quick Word on Security

Before you tell everyone about your app, just make sure:

- [ ] Your `JWT_SECRET` is actually secret (not "secret123")
- [ ] Your `.env` files are NOT in your Git repo ✅ (we've got this covered)
- [ ] You're setting variables in Railway, not hardcoding them in your code ✅
- [ ] CORS is working (it is!) ✅
- [ ] HTTPS is enabled (Railway handles this automatically) ✅

Basically, we've built this securely for you. You're good!

---

## 💰 How Much Will This Cost Me?

Great news: **it should be free!**

Railway gives you $5 in free credits every month, and your setup costs:
- PostgreSQL database: ~$1-2/month
- Backend API: ~$2-3/month
- Frontend: ~$0.50/month

So you're well within the free tier. As your app gets more popular, you might need to pay a little, but you won't be surprised by a huge bill. Railway is very transparent about costs.

---

## 🚀 You Did It!

Your GRC Tool Online is now:
- ✅ Running in the cloud on Railway
- ✅ Connected to a real PostgreSQL database
- ✅ Accessible from anywhere on the internet
- ✅ Automatically scales if you get more users
- ✅ Updates automatically whenever you push to GitHub

That's pretty amazing!

---

## 📞 Need Help?

### For Common Issues
Check out **`RAILWAY_TROUBLESHOOTING.md`** if things aren't working. It covers all the usual suspects (Dockerfile errors, connection problems, database issues, etc.).

### For Official Documentation
- **Railway Docs:** https://docs.railway.app (super helpful!)
- **Railway Community:** https://railway.app/community (real people answering questions)
- **Status Page:** https://status.railway.app (check if Railway is having issues)

### For Your App Specifically
- **Backend questions?** See `backend/README.md`
- **Frontend questions?** See `frontend/README.md`
- **General questions?** See the main `README.md`

### Quick Reminder
- To check what's wrong: Service → **Logs** tab
- To see how your app is performing: Service → **Metrics** tab
- To change settings: Service → **Settings** or **Variables** tab

---

## 🎉 Next Steps

Congrats! Your app is live. Now what?

1. **Test it** - Click around, create some projects, play with it
2. **Share it** - Send your frontend URL to friends/colleagues
3. **Iterate** - Build cool features, push to GitHub, Railway updates automatically
4. **Monitor it** - Check logs if something seems off
5. **Scale it** - If you get tons of users, Railway will scale automatically

---

## � You're Officially a Cloud Developer!

Your **GRC Tool Online** is now live on Railway at:
```
🌐 https://your-frontend-url.railway.app
```

Your team can visit this URL right now and start practicing GRC workflows. Every time you push code to GitHub, Railway automatically updates the live app.

Pretty cool, right? Welcome to the world of cloud development! 🚀
