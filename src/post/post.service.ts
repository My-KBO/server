import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/exceptions/error-code';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        userId,
        title: dto.title,
        content: dto.content,
      },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
        comments: true,
        likes: true,
      },
    });
    if (!post) throw new BusinessException(ErrorCode.POST_NOT_FOUND);
    return post;
  }

  async update(userId: string, id: number, dto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new BusinessException(ErrorCode.POST_NOT_FOUND);
    if (post.userId !== userId) throw new BusinessException(ErrorCode.NO_PERMISSION);

    return this.prisma.post.update({
      where: { id },
      data: {
        title: dto.title,
        content: dto.content,
      },
    });
  }

  async remove(userId: string, id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new BusinessException(ErrorCode.POST_NOT_FOUND);
    if (post.userId !== userId) throw new BusinessException(ErrorCode.NO_PERMISSION);

    await this.prisma.post.delete({ where: { id } });
  }

  async toggleLike(userId: string, postId: number) {
    const existing = await this.prisma.postLike.findFirst({
      where: { postId, userId },
    });

    if (existing) {
      await this.prisma.postLike.delete({ where: { id: existing.id } });
      await this.prisma.post.update({
        where: { id: postId },
        data: { likesCount: { decrement: 1 } },
      });
      return { liked: false };
    }

    await this.prisma.postLike.create({
      data: { postId, userId },
    });

    await this.prisma.post.update({
      where: { id: postId },
      data: { likesCount: { increment: 1 } },
    });

    return { liked: true };
  }
}
