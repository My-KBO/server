import { PostDto } from './post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PostListResponseDto {
  @ApiProperty({ type: [PostDto] })
  data: PostDto[];
  @ApiProperty({
    description: 'Pagination metadata',
    type: Object,
    example: {
      total: 100,
      page: 1,
      lastPage: 10,
    },
  })
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}
