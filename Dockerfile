FROM node:18

WORKDIR /app

# 설치 전 schema 파일 먼저 복사해서 캐시 무효화
COPY prisma ./prisma
COPY package*.json ./

RUN npm install

# 전체 소스 복사
COPY . .

# 이 시점에 schema.prisma가 존재하므로 generate가 유효하게 작동함
RUN npx prisma generate
RUN npm run build

CMD ["node", "dist/main"]
