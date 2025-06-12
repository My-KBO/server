export const ErrorCode = {
  // 1000번대: 사용자 관련
  EMAIL_ALREADY_EXISTS: 1001,
  INVALID_PASSWORD: 1002,
  USER_NOT_FOUND: 1003,

  // 2000번대: 인증/인가 관련
  ACCESS_DENIED: 2001,
  INVALID_TOKEN: 2002,

  // 3000번대: 게시물 관련
  POST_NOT_FOUND: 3001,
  COMMENT_NOT_FOUND: 3002,

  // 5000번대: 서버 에러
  INTERNAL_SERVER_ERROR: 5000,
} as const;
