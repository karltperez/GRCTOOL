FROM node:18-alpine

WORKDIR /app

# BUILD_ID: 20260206-v3 (Force fresh build on Railway)
# Step 1: Copy package files explicitly
COPY package.json /app/package.json
COPY package-lock.json* /app/package-lock.json
COPY tsconfig.json /app/tsconfig.json

# Step 2: Install dependencies
RUN npm ci --production=false

# Step 3: Copy source code
COPY src /app/src

# Step 4: Build TypeScript
RUN npm run build

# Step 5: Expose port and run
EXPOSE 5000

CMD ["npm", "start"]
