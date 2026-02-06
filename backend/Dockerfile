FROM node:18-alpine

WORKDIR /app

# Copy all files from the service directory
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript
RUN npm run build

EXPOSE 5000

# Start the application
CMD ["npm", "start"]
