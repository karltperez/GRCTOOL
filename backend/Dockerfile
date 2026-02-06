FROM node:18-alpine

WORKDIR /app

# Copy everything from the current directory
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript
RUN npm run build

EXPOSE 5000

# Start the application
CMD ["npm", "start"]
