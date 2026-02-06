#!/bin/bash
# Verification script to ensure all files are in place

echo "🔍 GRC Tool Online - Setup Verification"
echo "======================================"
echo ""

# Backend files
echo "📁 Checking Backend Files..."
BACKEND_FILES=(
  "backend/package.json"
  "backend/tsconfig.json"
  "backend/.env.example"
  "backend/.gitignore"
  "backend/Dockerfile"
  "backend/README.md"
  "backend/src/index.ts"
  "backend/src/middleware/auth.ts"
  "backend/src/routes/auth.ts"
  "backend/src/routes/projects.ts"
  "backend/src/routes/assets.ts"
  "backend/src/db/schema.sql"
)

for file in "${BACKEND_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (MISSING)"
  fi
done

# Frontend files
echo ""
echo "📁 Checking Frontend Files..."
FRONTEND_FILES=(
  "frontend/package.json"
  "frontend/tsconfig.json"
  "frontend/.env.example"
  "frontend/.gitignore"
  "frontend/Dockerfile"
  "frontend/README.md"
  "frontend/src/index.tsx"
  "frontend/src/index.css"
  "frontend/src/services/api.ts"
  "frontend/src/pages/LoginPage.tsx"
  "frontend/src/pages/RegisterPage.tsx"
  "frontend/src/pages/DashboardPage.tsx"
  "frontend/src/pages/ProjectPage.tsx"
  "frontend/public/index.html"
  "frontend/tailwind.config.js"
  "frontend/postcss.config.js"
)

for file in "${FRONTEND_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (MISSING)"
  fi
done

# Root files
echo ""
echo "📁 Checking Root Configuration Files..."
ROOT_FILES=(
  "README.md"
  "QUICKSTART.md"
  "RAILWAY_DEPLOYMENT.md"
  "SETUP_COMPLETE.md"
  "docker-compose.yml"
  ".gitignore"
  ".vscode/tasks.json"
  ".vscode/launch.json"
  ".github/copilot-instructions.md"
)

for file in "${ROOT_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (MISSING)"
  fi
done

echo ""
echo "======================================"
echo "✅ Setup Verification Complete!"
echo ""
echo "Next Steps:"
echo "1. Review QUICKSTART.md for setup instructions"
echo "2. Run 'docker-compose up' to start locally"
echo "3. Visit http://localhost:3000"
echo ""
echo "For more details, see SETUP_COMPLETE.md"
