# 🖥️ Local Hosting Guide - Share Your GRC Tool with Coworkers

## Overview

You can run the GRC Tool locally on your desktop and share it with your coworkers over the internet using a tunneling service like ngrok. This is perfect for testing and team collaboration!

---

## What You'll Need

- ✅ Docker Desktop installed (Windows, Mac, or Linux)
- ✅ The GRC Tool code (you have this!)
- ✅ A tunneling service account (ngrok is free: https://ngrok.com)
- ✅ Your desktop running 24/7 while coworkers use it

---

## Step 1: Install Docker Desktop

### Download
Go to https://www.docker.com/products/docker-desktop and download for your OS.

### Install
- Follow the installer
- Restart your computer when prompted
- Open Docker Desktop app (it should auto-start)

### Verify Installation
Open PowerShell and run:
```powershell
docker --version
docker-compose --version
```

You should see version numbers. If not, Docker isn't installed correctly.

---

## Step 2: Start the Application Locally

### Navigate to Project
```powershell
cd "d:\Dev Stuffs\GRC TOOL ONLINE"
```

### Start Everything with Docker Compose
```powershell
docker-compose up
```

**What this does:**
- Starts PostgreSQL database (port 5432)
- Starts Node.js backend (port 5000)
- Starts React frontend (port 3000)

### Wait for Services to Start

You'll see output like:
```
backend-1  | 🚀 Server running on port 5000
frontend-1 | Compiled successfully!
postgres-1 | PostgreSQL is ready to accept connections
```

**When you see this, everything is running!** ✅

### Access Locally

Open your browser and visit:
```
http://localhost:3000
```

You should see the login page. Try registering a test user to make sure everything works!

---

## Step 3: Set Up ngrok for Internet Access

### Create Free ngrok Account
1. Go to https://ngrok.com
2. Sign up for a free account
3. Download ngrok for your OS
4. Extract it somewhere (e.g., `C:\ngrok`)

### Get Your Auth Token
1. Log in to ngrok dashboard
2. Go to "Your Authtoken" 
3. Copy the token
4. Run in PowerShell:
```powershell
ngrok authtoken YOUR_TOKEN_HERE
```

### Create a Tunnel to Your Frontend

Open a **new PowerShell window** (keep the other one running docker-compose):

```powershell
ngrok http 3000
```

You'll see output like:
```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        us (United States)
Forwarding                    https://abc123.ngrok.io -> http://localhost:3000
```

**Copy that URL:** `https://abc123.ngrok.io`

This is your public URL! ✅

---

## Step 4: Share with Coworkers

Send your coworkers the ngrok URL:
```
https://abc123.ngrok.io
```

They can now:
1. Open the URL in their browser
2. See your GRC Tool login page
3. Register and start using it!

---

## Important Notes

### Database Notes
- ✅ You have PostgreSQL running in Docker (contained locally)
- ✅ All data is stored locally on your machine
- ✅ If you restart Docker, data persists (unless you run `docker-compose down`)
- ⚠️ If you shut down Docker, the app stops working

### ngrok URL Notes
- ⚠️ The URL changes every time you restart ngrok
- ⚠️ You need to share the new URL with coworkers
- 💡 **Pro tip:** With a paid ngrok account, you can get a static URL

### Performance Notes
- 💻 Your desktop will be using some CPU/RAM
- 📡 Internet speed depends on your connection
- ⚠️ Only works while your desktop is on and Docker is running

---

## Troubleshooting

### Docker won't start
**Check:**
- Is Docker Desktop running? (Look in system tray)
- Do you have enough RAM? (Docker needs 2-4GB)
- Run: `docker ps` to verify Docker is working

### Can't access http://localhost:3000
**Check:**
- Run `docker-compose ps` - are all services running?
- Check docker-compose output for errors
- Try: `docker-compose logs frontend`

### ngrok URL doesn't work
**Check:**
- Is ngrok still running in your PowerShell window?
- Is the tunnel still active? (Look for "Status: online")
- Did you share the correct URL?
- Are coworkers using the HTTPS version? (not HTTP)

### Coworkers can't login/save data
**Check:**
- Is the backend running? (Look for "Server running on port 5000")
- Do they have the database schema? (Check logs for errors)
- Is there a firewall blocking the connection?

---

## Daily Workflow

### Morning - Start the App
```powershell
# Terminal 1: Start Docker
cd "d:\Dev Stuffs\GRC TOOL ONLINE"
docker-compose up

# Terminal 2: Start ngrok
ngrok http 3000

# Share the ngrok URL with coworkers
```

### During the Day
- Coworkers use the ngrok URL
- All data is saved to your local PostgreSQL
- Keep your desktop on and connected to internet

### Evening - Stop Everything
```powershell
# In Terminal 1 (Docker), press Ctrl+C to stop
# This shuts down all containers

# In Terminal 2 (ngrok), press Ctrl+C to stop
# This closes the tunnel
```

---

## Making Code Changes

If you want to update the code while coworkers are using it:

1. **Stop Docker:** Press `Ctrl+C` in the docker-compose terminal
2. **Make your changes** and commit to Git
3. **Rebuild:** Run `docker-compose up --build`
4. **Share new ngrok URL** with coworkers

---

## If You Want to Keep It Running 24/7

### Option 1: Dedicated Server
Get a cheap VPS ($5-10/month) and run Docker there instead of your desktop.

### Option 2: Always-On PC
Use an old laptop or Raspberry Pi as a dedicated server.

### Option 3: Cloud Hosting
Go back to Railway or use AWS, Google Cloud, etc. (we avoided this, but it's always an option).

---

## Advanced: Using a Static ngrok URL

If you get a paid ngrok account ($5/month):

```powershell
ngrok http 3000 --domain=your-custom-domain.ngrok.io
```

This gives you a permanent URL that doesn't change!

---

## Summary

✅ Run locally with Docker Compose
✅ Expose with ngrok for internet access
✅ Share URL with coworkers
✅ They can use your GRC Tool
✅ All data stored locally on your desktop

That's it! Pretty simple, right? 🚀

---

## Need Help?

**Docker questions:** https://docs.docker.com/compose/
**ngrok questions:** https://ngrok.com/docs
**GRC Tool questions:** Check `README.md` or `backend/README.md`

Happy hosting! 🎉
