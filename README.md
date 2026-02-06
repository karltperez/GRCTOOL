# GRC Tool Online - Full Stack Application

A modern, cloud-ready Governance, Risk & Compliance (GRC) learning platform built with React, Node.js, and PostgreSQL.

## 🏗️ Project Structure

```
grc-tool-online/
├── backend/               # Node.js/Express API
│   ├── src/
│   │   ├── index.ts      # Main server file
│   │   ├── middleware/   # Authentication & middleware
│   │   ├── routes/       # API endpoints
│   │   └── db/           # Database schema
│   ├── package.json
│   └── tsconfig.json
├── frontend/              # React application
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── services/     # API client
│   │   └── index.tsx     # App entry point
│   ├── package.json
│   └── public/
└── .github/
    └── copilot-instructions.md
```

## ⚡ Tech Stack

**Backend:**
- Node.js + Express
- TypeScript
- PostgreSQL
- JWT Authentication
- Helmet for security
- CORS support

**Frontend:**
- React 18
- TypeScript
- React Router
- Tailwind CSS
- Axios for API calls
- React Icons

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Git

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database connection
# DATABASE_URL=postgresql://user:password@localhost:5432/grc_tool
# JWT_SECRET=your_secret_key

# Run database schema
psql -U user -d grc_tool -f src/db/schema.sql

# Start development server
npm run dev
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Assets
- `GET /api/assets/project/:projectId` - Get project assets
- `POST /api/assets` - Create new asset

## 🗄️ Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password (Hashed)
- name
- created_at, updated_at

### Projects Table
- id (Primary Key)
- user_id (Foreign Key)
- name
- description
- created_at, updated_at

### Assets Table
- id (Primary Key)
- project_id (Foreign Key)
- name
- type
- description
- created_at, updated_at

### Additional Tables
- risks
- controls

## 🔐 Authentication

- User registration with email/password
- Passwords hashed with bcryptjs
- JWT token-based authentication
- Token stored in localStorage
- Automatic token injection in API requests

## 🌐 Deployment (Railway)

### Backend Deployment

1. Create `Dockerfile` in backend:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

2. Push to Git and connect Railway to your repo
3. Set environment variables in Railway dashboard
4. Deploy!

### Frontend Deployment

1. Build the app:
```bash
npm run build
```

2. Deploy to Vercel, Netlify, or Railway static hosting

## 📝 Features (MVP)

✅ User authentication
✅ Project management
✅ Asset inventory
✅ Database persistence
✅ Type-safe API layer
✅ Responsive UI with Tailwind CSS

## 🗺️ Roadmap

- Risk register
- Control mapping
- Statement of Applicability (SoA)
- Risk heatmaps
- Evidence tracking
- Vendor risk management
- Executive dashboards
- Report generation
- Collaboration features

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please submit issues and pull requests.
