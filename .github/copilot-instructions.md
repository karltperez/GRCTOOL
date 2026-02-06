<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# GRC Tool Online - Development Instructions

## Project Overview
This is a full-stack GRC (Governance, Risk & Compliance) learning platform built with:
- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL
- **Deployment:** Railway

## Technology Stack
- React Router for navigation
- Axios for API calls with JWT authentication
- Express.js with helmet for security
- bcryptjs for password hashing
- jsonwebtoken for JWT handling

## Code Standards
- Use TypeScript strictly for type safety
- Follow REST API conventions
- Use functional components and hooks in React
- Implement proper error handling
- Add authentication checks on protected routes
- Use environment variables for sensitive data

## File Organization
```
backend/src/
  ├── index.ts          - Main server
  ├── middleware/       - Auth and other middleware
  ├── routes/           - API endpoint handlers
  └── db/               - Database schema

frontend/src/
  ├── pages/            - Page components
  ├── services/         - API client and utilities
  ├── index.tsx         - App entry point
  └── index.css         - Global styles
```

## Key Features to Implement
- User authentication (register/login)
- Project CRUD operations
- Asset management
- Risk register
- Control mapping
- Evidence tracking
- Executive dashboards

## Testing & Deployment
- Backend runs on port 5000
- Frontend runs on port 3000
- Database connection via DATABASE_URL env variable
- JWT secret required for production
- CORS configured for frontend-backend communication
- Ready for Railway deployment

## Development Commands
```bash
# Backend
npm install && npm run dev

# Frontend
npm install && npm start

# Build for production
npm run build
```
