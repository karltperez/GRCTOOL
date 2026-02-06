FROM node:18-alpine as build

WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN npm install

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
