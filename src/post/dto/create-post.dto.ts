import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PostCategory } from 'src/common/constants/post-category.enum';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(PostCategory)
  category: PostCategory;
}
