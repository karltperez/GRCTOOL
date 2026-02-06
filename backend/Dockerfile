FROM node:18-alpine

WORKDIR /app

# Copy package files (when root directory is set to 'backend' in Railway)
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

EXPOSE 5000

# Start the application
CMD ["npm", "start"]
