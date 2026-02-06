# GRC Tool Online - Frontend

React-based user interface for the GRC Tool learning platform.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm start
```

Application will open at `http://localhost:3000`

## Project Structure

```
src/
├── pages/
│   ├── LoginPage.tsx      - User login
│   ├── RegisterPage.tsx   - User registration
│   ├── DashboardPage.tsx  - Projects list
│   └── ProjectPage.tsx    - Project details
├── services/
│   └── api.ts             - API client with axios
├── index.tsx              - App entry point
└── index.css              - Global styles
```

## Key Features

### Authentication
- Email/password registration
- Secure login with JWT
- Protected routes
- Automatic token injection

### Projects
- Create, read, update, delete projects
- Project listing on dashboard
- Persistent storage

### Assets
- Asset inventory per project
- Multiple asset types
- Asset descriptions and details

## Components

### LoginPage
- Email and password input
- Error handling
- Link to registration
- Auto-redirect to dashboard if authenticated

### RegisterPage
- Full name, email, password inputs
- Form validation
- Password strength requirement (6+ chars)
- Link to login

### DashboardPage
- Welcome message with user name
- Project list grid
- Create new project form
- Logout button

### ProjectPage
- Project name and description
- Asset management
- Add new assets
- Asset listing

## Styling

- **Tailwind CSS** for utility-first styling
- Responsive design (mobile-first)
- Modern color scheme
- Interactive states and transitions

## API Integration

### Authentication
- `authAPI.register(email, password, name)`
- `authAPI.login(email, password)`

### Projects
- `projectsAPI.getAll()`
- `projectsAPI.getById(id)`
- `projectsAPI.create(name, description)`
- `projectsAPI.update(id, name, description)`
- `projectsAPI.delete(id)`

### Assets
- `assetsAPI.getByProject(projectId)`
- `assetsAPI.create(projectId, name, type, description)`

## Local Storage

- **token** - JWT authentication token
- **user** - Current user data (id, email, name)

## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Environment Variables

```
REACT_APP_API_URL=http://localhost:5000/api
```

For production, update to your backend URL.

## Development

### Add New Page
1. Create component in `src/pages/`
2. Add route in `index.tsx`
3. Protect route if authenticated required

### Add API Endpoint
1. Add method in `src/services/api.ts`
2. Use in component via async/await
3. Handle loading and error states

## Deployment

### Build for Production
```bash
npm run build
```

Creates optimized build in `build/` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Railway
1. Connect GitHub repository
2. Set `REACT_APP_API_URL` environment variable
3. Deploy!

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library

## Best Practices

- Use TypeScript for type safety
- Handle loading and error states
- Protect sensitive routes
- Use environment variables
- Keep components focused and reusable
- Validate user input
