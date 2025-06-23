FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY .env .env

RUN npm install

COPY . .

RUN npm run build
RUN npm run build && ls -al dist
RUN npx prisma generate

CMD ["node", "dist/main"]
