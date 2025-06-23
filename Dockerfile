FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY .env .env

COPY . .

RUN npm install

RUN npm run build

RUN npx prisma generate

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["node", "dist/main"]
