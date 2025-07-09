import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PostCategory } from 'src/common/constants/post-category.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '제목' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '본문 내용' })
  content: string;

  @IsEnum(PostCategory)
  @ApiProperty({ description: '게시글 카테고리', enum: PostCategory })
  @IsNotEmpty()
  category: PostCategory;
}
