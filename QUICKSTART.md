# 🚀 Quick Start Guide

## Setup Everything in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- PostgreSQL installed and running locally
- Git

### Option 1: Docker Compose (Easiest)

```bash
# Start all services
docker-compose up

# First time - initialize database
docker exec grc-tool-online-postgres-1 psql -U grc_user -d grc_tool -f backend/src/db/schema.sql
```

Then visit:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api/health

### Option 2: Local Development

#### Terminal 1 - Backend

```bash
cd backend
cp .env.example .env

# Edit .env with your database URL
# DATABASE_URL=postgresql://user:password@localhost:5432/grc_tool

npm install
npm run dev
```

Backend running at: `http://localhost:5000`

#### Terminal 2 - Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Frontend opens automatically at: `http://localhost:3000`

#### Terminal 3 - Database Setup

```bash
# Only needed on first run
psql -U your_user -d grc_tool -f backend/src/db/schema.sql
```

## 🧪 Test the Application

1. **Register**: Create an account at http://localhost:3000/register
   - Email: test@example.com
   - Password: Test@123
   - Name: Test User

2. **Login**: Sign in with your credentials

3. **Create Project**: Click "New Project"
   - Name: My First GRC Project
   - Description: Testing the platform

4. **Add Assets**: Click on project → "Add Asset"
   - Asset Name: Web Server
   - Type: Server
   - Description: Production web server

5. **Verify**: Check database
   ```bash
   psql -U your_user -d grc_tool
   SELECT * FROM users;
   SELECT * FROM projects;
   SELECT * FROM assets;
   ```

## 📁 Project Structure

```
grc-tool-online/
├── backend/               # Express API
│   ├── src/
│   │   ├── index.ts      # Main server
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth
│   │   └── db/           # Database schema
│   ├── package.json
│   ├── Dockerfile        # For Railway
│   └── README.md
├── frontend/              # React app
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── services/     # API client
│   │   └── index.tsx     # Entry point
│   ├── package.json
│   ├── Dockerfile        # For Railway
│   └── README.md
├── docker-compose.yml    # Local Docker setup
└── README.md            # Full documentation
```

## 🔑 Key Commands

### Backend
```bash
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm start           # Run production build
npm run typecheck   # Check TypeScript types
```

### Frontend
```bash
npm install         # Install dependencies
npm start           # Start dev server
npm run build       # Build for production
npm test            # Run tests
```

## 🌐 Deploy to Railway

See `RAILWAY_DEPLOYMENT.md` for detailed instructions.

Quick summary:
1. Push to GitHub
2. Connect Railway to repo
3. Add PostgreSQL service
4. Add backend service (set env vars)
5. Add frontend service (set REACT_APP_API_URL)
6. Deploy!

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@localhost:5432/grc_tool
PORT=5000
NODE_ENV=development
JWT_SECRET=dev_secret_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Port 3000 or 5000 already in use?
```bash
# Windows - Find process on port
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Database connection error?
```bash
# Test connection
psql -U your_user -d grc_tool -c "SELECT NOW();"

# Check your DATABASE_URL format
# postgresql://username:password@host:port/database
```

### Module not found errors?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Still stuck?
1. Check README.md in backend/ folder
2. Check README.md in frontend/ folder
3. Review RAILWAY_DEPLOYMENT.md
4. Check application logs

## ✨ Next Steps

1. ✅ Get the app running locally
2. 📚 Review the codebase
3. 🎨 Customize the UI/UX
4. 📊 Add more GRC features
5. 🚀 Deploy to Railway

## 📞 Support

- Backend issues: See `backend/README.md`
- Frontend issues: See `frontend/README.md`
- Deployment help: See `RAILWAY_DEPLOYMENT.md`
- General: See main `README.md`

Happy coding! 🎉
