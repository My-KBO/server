import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PostCategory } from 'src/common/constants/post-category.enum';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsEnum(PostCategory)
  category: PostCategory;
}
