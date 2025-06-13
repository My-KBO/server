import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from '../user/decorator/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('댓글(Comment)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: '댓글 작성' })
  create(@User('id') userId: string, @Body() dto: CreateCommentDto) {
    return this.commentService.create(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '댓글 수정' })
  update(
    @User('id') userId: string,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentService.update(userId, commentId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '댓글 삭제' })
  delete(@User('id') userId: string, @Param('id', ParseIntPipe) commentId: number) {
    return this.commentService.delete(userId, commentId);
  }

  @Post(':commentId/like')
  @ApiOperation({ summary: '댓글 좋아요 추가' })
  async likeComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @User('id') userId: string,
  ) {
    return this.commentService.like(commentId, userId);
  }

  @Delete(':commentId/like')
  @ApiOperation({ summary: '댓글 좋아요 취소' })
  async unlikeComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @User('id') userId: string,
  ) {
    return this.commentService.unlike(commentId, userId);
  }

  @Get('post/:postId')
  @ApiOperation({ summary: '게시글의 댓글 목록 조회' })
  findByPost(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentService.findByPost(postId);
  }
}
