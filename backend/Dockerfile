FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./backend/
COPY backend/tsconfig.json ./backend/

WORKDIR /app/backend

RUN npm install

COPY backend/src ./src

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
