FROM node:18-alpine as build

WORKDIR /app

# BUILD_ID: 20260206-v4 (Complete rebuild - using COPY . . approach)
# Copy everything from build context
COPY . .

# Install dependencies
RUN npm ci --production=false

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

CMD ["serve", "-s", "build", "-l", "3000"]
