FROM node:14.17.2-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]
# CMD ["node", "./dist/main.js"]
