# GRC Tool Online - Backend

REST API server for the GRC Tool learning platform.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret for JWT tokens
- `FRONTEND_URL`: Frontend URL for CORS

### 3. Initialize Database
```bash
psql -U your_user -d your_database -f src/db/schema.sql
```

### 4. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Documentation

### Auth Endpoints

**Register**
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": { "id": 1, "email": "user@example.com", "name": "User Name" },
  "token": "jwt_token_here"
}
```

### Projects Endpoints

All project endpoints require Bearer token in Authorization header:
```
Authorization: Bearer your_jwt_token
```

**Get All Projects**
```
GET /api/projects
```

**Create Project**
```
POST /api/projects
{
  "name": "Project Name",
  "description": "Project description"
}
```

**Get Project**
```
GET /api/projects/:id
```

**Update Project**
```
PUT /api/projects/:id
{
  "name": "Updated Name",
  "description": "Updated description"
}
```

**Delete Project**
```
DELETE /api/projects/:id
```

## Project Structure

```
src/
├── index.ts           - Express app setup
├── middleware/
│   └── auth.ts        - JWT verification
├── routes/
│   ├── auth.ts        - Authentication endpoints
│   ├── projects.ts    - Project management
│   └── assets.ts      - Asset management
└── db/
    └── schema.sql     - Database schema
```

## Scripts

- `npm run dev` - Start dev server with ts-node
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled JavaScript
- `npm run typecheck` - Check types without compiling

## Dependencies

- **express** - Web framework
- **pg** - PostgreSQL client
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT handling
- **cors** - CORS middleware
- **helmet** - Security headers
- **express-validator** - Input validation
- **dotenv** - Environment variables

## Development

The backend is set up for Railway deployment:
- Uses standard Node.js patterns
- Environment-based configuration
- PostgreSQL ready
- CORS configured for frontend
- Error handling implemented

## Docker Deployment

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

Connect to Railway and watch it deploy automatically!
