import { ApiProperty } from '@nestjs/swagger';

export class PostCommentDto {
  @ApiProperty({ description: '댓글 ID' })
  id: number;
  @ApiProperty({ description: '댓글 내용' })
  content: string;
  @ApiProperty({ description: '작성일' })
  created_at: string;

  @ApiProperty({ description: '작성자 정보' })
  user: {
    nickname: string;
  };
}

export class PostDetailDto {
  @ApiProperty({ description: '게시글 ID' })
  id: number;
  @ApiProperty({ description: '제목' })
  title: string;
  @ApiProperty({ description: '본문 내용' })
  content: string;
  @ApiProperty({ description: '조회수' })
  views: number;
  @ApiProperty({ description: '게시글 카테고리' })
  category: string;
  @ApiProperty({ description: '추천 수' })
  likes_count: number;
  @ApiProperty({ description: '댓글 수' })
  comments_count: number;
  @ApiProperty({ description: '작성일' })
  created_at: string;
  @ApiProperty({ description: '수정일' })
  updated_at: string;
  @ApiProperty({ description: '작성자 정보' })
  user: {
    nickname: string;
  };
  comments: PostCommentDto[];
}
