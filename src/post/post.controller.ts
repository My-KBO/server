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
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User as UserDecorator } from '../user/decorator/user.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  createPost(@UserDecorator('id') userId: string, @Body() dto: CreatePostDto) {
    return this.postService.createPost(userId, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 단일 조회' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @UserDecorator('id') userId: string,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postService.updatePost(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  deletePost(@Param('id', ParseIntPipe) id: number, @UserDecorator('id') userId: string) {
    return this.postService.deletePost(userId, id);
  }

  @Post(':id/like')
  @ApiOperation({ summary: '게시글 좋아요' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  likePost(@Param('id', ParseIntPipe) id: number, @UserDecorator('id') userId: string) {
    return this.postService.likePost(userId, id);
  }
}
