# Railway Deployment Guide for GRC Tool Online

## Overview

This guide walks you through deploying the GRC Tool Online full-stack application to Railway.

## Prerequisites

- GitHub account with repository containing the project
- Railway account (https://railway.app)
- Database ready (Railway provides PostgreSQL)

## Step 1: Prepare Repository

Make sure your repository includes:
- `backend/` directory with Node.js app
- `backend/Dockerfile`
- `frontend/` directory with React app
- `frontend/Dockerfile`
- `docker-compose.yml`
- Both `.env.example` files

```bash
git add .
git commit -m "Initial commit - GRC Tool Online full-stack"
git push
```

## Step 2: Create Railway Services

### 2a. Create PostgreSQL Service

1. Go to https://railway.app
2. Click "New Project"
3. Select "Provision PostgreSQL"
4. Railway will create a PostgreSQL database

Copy your DATABASE_URL from the PostgreSQL service dashboard.

### 2b. Create Backend Service

1. In your Railway project, click "New Service"
2. Select "GitHub Repo"
3. Select your GRC Tool repository
4. Configure:
   - **Root Directory:** `backend`
   - **Environment Variables:**
     ```
     DATABASE_URL=your_postgres_url
     PORT=5000
     NODE_ENV=production
     JWT_SECRET=your_very_secret_key_here
     FRONTEND_URL=https://your-frontend-url.railway.app
     ```

Railway will auto-detect the Dockerfile and deploy.

### 2c. Create Frontend Service

1. In your Railway project, click "New Service"
2. Select "GitHub Repo"
3. Select your GRC Tool repository
4. Configure:
   - **Root Directory:** `frontend`
   - **Environment Variables:**
     ```
     REACT_APP_API_URL=https://your-backend-url.railway.app/api
     ```

## Step 3: Initialize Database

After backend deployment:

1. In Railway dashboard, open backend service
2. Go to "Deployments"
3. Click "Connect" on latest deployment
4. Run database schema:
   ```bash
   psql -d your_database_url -f backend/src/db/schema.sql
   ```

Or use a Railway PostgreSQL terminal:
```sql
-- Copy schema.sql content and execute
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ... rest of schema
```

## Step 4: Verify Deployment

1. Visit your frontend URL
2. Register a new account
3. Try creating a project
4. Verify data persists in PostgreSQL

## Environment Variables Reference

### Backend
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - production/development
- `JWT_SECRET` - Secret key for JWT tokens (use strong value!)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend
- `REACT_APP_API_URL` - Backend API URL (e.g., `https://backend.railway.app/api`)

## Troubleshooting

### Backend not connecting to database
- Check DATABASE_URL format
- Verify database server is running
- Check network connectivity

### Frontend API calls failing
- Verify REACT_APP_API_URL is correct
- Check CORS settings in backend
- Ensure backend is running

### Database schema not applying
- Connect to database manually with psql
- Run schema commands individually
- Check for permission errors

## Custom Domains

To add custom domains on Railway:

1. Go to service settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Monitoring

Railway provides:
- Deployment logs
- Environment variables
- Resource usage
- Error tracking

Monitor these regularly to ensure smooth operation.

## Updates & Redeployment

To deploy updates:
1. Push changes to GitHub
2. Railway auto-redeploys on push (if configured)
3. Check deployment logs for errors
4. Run new migrations if needed

## Scaling

As your application grows:
- PostgreSQL can be upgraded within Railway
- Backend can be scaled via Railway dashboard
- Frontend is static and highly scalable

## Security Checklist

- [ ] Change JWT_SECRET to random string
- [ ] Use strong database password
- [ ] Enable HTTPS (Railway provides)
- [ ] Set proper CORS_ORIGIN
- [ ] Review API rate limiting
- [ ] Enable database backups
- [ ] Monitor unauthorized access attempts

## Support

For issues:
- Check Railway documentation: https://docs.railway.app
- Review application logs
- Check environment variables
- Verify database connectivity

---

Good luck with your GRC Tool deployment! 🚀
