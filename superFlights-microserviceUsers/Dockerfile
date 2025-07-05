FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile --production=false

RUN npm rebuild bcrypt --unsafe-perm

COPY ./dist ./src

CMD ["node", "src/main.js"]