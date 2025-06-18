import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../user/decorator/user.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { PostCategory } from 'src/common/constants/post-category.enum';

@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  createPost(@User('id') userId: string, @Body() dto: CreatePostDto) {
    return this.postService.createPost(userId, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 조회 ' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  @ApiOkResponse({ description: '게시글 상세 정보 반환' })
  getPostDetail(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.getPostDetail(postId);
  }

  @Get()
  @ApiOperation({ summary: '게시글 목록 조회 (검색, 카테고리, 페이징)' })
  @ApiQuery({ name: 'category', enum: PostCategory, required: false })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  getPosts(
    @Query('category') category?: PostCategory,
    @Query('search') search?: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.postService.getPosts({ category, search, page, limit });
  }

  @Put(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: string,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postService.updatePost(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  deletePost(@Param('id', ParseIntPipe) id: number, @User('id') userId: string) {
    return this.postService.deletePost(userId, id);
  }

  @Post(':id/like')
  @ApiOperation({ summary: '게시글 좋아요' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  likePost(@Param('id', ParseIntPipe) id: number, @User('id') userId: string) {
    return this.postService.likePost(userId, id);
  }
}
