import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/constants/error/error-code';
import { ErrorMessage } from '../common/constants/error/error-message';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateCommentDto) {
    const post = await this.prisma.post.findUnique({ where: { id: dto.postId } });
    if (!post) {
      throw new BusinessException(ErrorCode.Post.POST_NOT_FOUND, ErrorMessage.Post.POST_NOT_FOUND);
    }

    return this.prisma.comment.create({
      data: {
        content: dto.content,
        postId: dto.postId,
        userId,
      },
    });
  }

  async update(userId: string, commentId: number, dto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment || comment.userId !== userId) {
      throw new BusinessException(
        ErrorCode.Comment.COMMENT_NOT_FOUND,
        ErrorMessage.Comment.COMMENT_NOT_FOUND,
      );
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { content: dto.content },
    });
  }

  async delete(userId: string, commentId: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment || comment.userId !== userId) {
      throw new BusinessException(
        ErrorCode.Comment.COMMENT_NOT_FOUND,
        ErrorMessage.Comment.COMMENT_NOT_FOUND,
      );
    }

    return this.prisma.comment.delete({ where: { id: commentId } });
  }

  async findByPost(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async like(commentId: number, userId: string) {
    const exists = await this.prisma.commentLike.findFirst({
      where: { commentId, userId },
    });
    if (exists) {
      throw new BusinessException(
        ErrorCode.Comment.COMMENT_ALREADY_LIKED,
        ErrorMessage.Comment.COMMENT_ALREADY_LIKED,
      );
    }

    return this.prisma.commentLike.create({
      data: { commentId, userId },
    });
  }

  async unlike(commentId: number, userId: string) {
    const like = await this.prisma.commentLike.findFirst({
      where: { commentId, userId },
    });

    if (!like) {
      throw new BusinessException(
        ErrorCode.Comment.COMMENT_LIKE_NOT_FOUND,
        ErrorMessage.Comment.COMMENT_LIKE_NOT_FOUND,
      );
    }

    await this.prisma.commentLike.delete({ where: { id: like.id } });
  }
}
