export const ErrorMessage = {
  User: {
    USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
    INVALID_PASSWORD: '비밀번호가 일치하지 않습니다.',
    EMAIL_ALREADY_EXISTS: '이미 존재하는 이메일입니다.',
    INVALID_REFRESH_TOKEN: '유효하지 않은 리프레시 토큰입니다.',
  },

  Post: {
    POST_NOT_FOUND: '게시글을 찾을 수 없습니다.',
    NO_PERMISSION: '게시글을 수정하거나 삭제할 권한이 없습니다.',
    POST_ALREADY_LIKED: '이미 게시글에 좋아요를 눌렀습니다.',
    POST_LIKE_NOT_FOUND: '해당 게시글에 대한 좋아요 정보를 찾을 수 없습니다.',
    ACCESS_DENIED: '게시글 접근 권한이 없습니다.',
  },

  Comment: {
    COMMENT_NOT_FOUND: '댓글을 찾을 수 없습니다.',
    NO_PERMISSION: '댓글을 수정하거나 삭제할 권한이 없습니다.',
    COMMENT_ALREADY_LIKED: '이미 댓글에 좋아요를 눌렀습니다.',
    COMMENT_LIKE_NOT_FOUND: '해당 댓글에 대한 좋아요 정보를 찾을 수 없습니다.',
  },
};
