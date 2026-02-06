FROM node:18-alpine as build

WORKDIR /app

# Step 1: Copy package files explicitly
COPY package.json /app/package.json
COPY package-lock.json* /app/package-lock.json
COPY tsconfig.json /app/tsconfig.json
COPY tailwind.config.js /app/tailwind.config.js
COPY postcss.config.js /app/postcss.config.js

# Step 2: Install dependencies
RUN npm ci --production=false

# Step 3: Copy source code and public files
COPY src /app/src
COPY public /app/public

# Step 4: Build the React app
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
