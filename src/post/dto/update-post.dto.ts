import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PostCategory } from 'src/common/constants/post-category.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '제목' })
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '본문 내용' })
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(PostCategory)
  @ApiProperty({ description: '게시글 카테고리', enum: PostCategory })
  category: PostCategory;
}
