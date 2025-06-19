FROM node:18

WORKDIR /app

# 패키지 설치
COPY package*.json ./
RUN npm install

# 소스 코드 및 prisma 파일 복사
COPY . .

# Prisma client 생성
RUN npx prisma generate

# NestJS 빌드
RUN npm run build

# 앱 실행
CMD ["node", "dist/main"]
