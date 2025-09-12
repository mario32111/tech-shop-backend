FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .

RUN pnpm install 

COPY ./dist ./src

CMD ["node", "src/main.js"]