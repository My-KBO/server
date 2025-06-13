import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from '../user/decorator/user.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@@ApiTags('게시글')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: '게시글 생성' })
  @HttpPost()
  create(@User('id') userId: string, @Body() dto: CreatePostDto) {
    return this.postService.create(userId, dto);
  }

  @ApiOperation({ summary: '게시글 단일 조회' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @ApiOperation({ summary: '게시글 수정' })
  @Patch(':id')
  update(@User('id') userId: string, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return this.postService.update(userId, id, dto);
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @Delete(':id')
  remove(@User('id') userId: string, @Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(userId, id);
  }

  @ApiOperation({ summary: '게시글 좋아요 토글' })
  @Post(':id/like')
  toggleLike(@User('id') userId: string, @Param('id', ParseIntPipe) id: number) {
    return this.postService.toggleLike(userId, id);
  }
}