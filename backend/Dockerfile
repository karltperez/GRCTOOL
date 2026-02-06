FROM node:18-alpine

WORKDIR /app

# BUILD_ID: 20260206-v4 (Complete rebuild - using COPY . . approach)
# Copy everything from build context
COPY . .

# Install dependencies
RUN npm ci --production=false

# Build TypeScript
RUN npm run build

# Expose port and run
EXPOSE 5000

CMD ["npm", "start"]
