FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY .env .env

RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate

CMD ["node", "dist/main"]
