FROM node:18-alpine as build

WORKDIR /app

# Copy package files (when root directory is set to 'frontend' in Railway)
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . ./

# Build the React app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the app
RUN npm install -g serve

# Copy built app from build stage
COPY --from=build /app/build ./build

EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]
