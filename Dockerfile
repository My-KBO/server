FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY .env .env

COPY . .

RUN npm install

RUN npm run build

RUN npx prisma generate

CMD ["node", "dist/main"]
