## 폴더 구조

```bash
server/
├── prisma/ # Prisma 관련 설정 및 마이그레이션
│ ├── schema.prisma
│ └── migrations/
├── src/
│ ├── auth/ # 인증/인가 (로그인, 토큰 발급 등)
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ ├── jwt.strategy.ts
│ │ └── dto/
│ │ └── login.dto.ts
│ ├── user/ # 사용자 정보, 마이페이지
│ ├── post/ # 게시글 API
│ ├── comment/ # 댓글 API
│ ├── baseball/ # 야구 관련 기능 (팀, 선수, 경기)
│ ├── highlight/ # 뉴스 및 하이라이트 영상 관련
│ ├── schedule/ # 경기 일정 관리 (크롤링, 업데이트 크론)
│ ├── crawler/ # 크롤러 로직 (cheerio, axios 등)
│ ├── common/ # 공통 유틸, 상수, 인터페이스 등
│ │ ├── guards/
│ │ ├── filters/
│ │ └── interceptors/
│ ├── prisma/ # PrismaService 및 모듈
│ │ ├── prisma.module.ts
│ │ └── prisma.service.ts
│ ├── config/ # 환경 설정 모듈 
│ ├── app.module.ts # 루트 모듈
│ ├── app.controller.ts # 루트 컨트롤러
│ └── main.ts 
├── test/
├── .env # 환경변수 설정
├── .eslintrc.js
├── .prettierrc
├── package.json
└── tsconfig.json
```
