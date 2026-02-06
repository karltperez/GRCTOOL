FROM node:18-alpine

WORKDIR /app

# Copy package files (these are required)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy TypeScript config if it exists, then source code
COPY . ./

# Build TypeScript
RUN npm run build

EXPOSE 5000

# Start the application
CMD ["npm", "start"]
