import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/constants/error/error-code';
import { ErrorMessage } from '../common/constants/error/error-message';
import { PostCategory } from 'src/common/constants/post-category.enum';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  private async getPostOrThrow(postId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new BusinessException(ErrorCode.Post.POST_NOT_FOUND, ErrorMessage.Post.POST_NOT_FOUND);
    }
    return post;
  }

  async createPost(userId: string, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        userId,
        title: dto.title,
        content: dto.content,
        category: dto.category,
      },
    });
  }

  async getPosts({
    category,
    search,
    page,
    limit,
  }: {
    category?: PostCategory;
    search?: string;
    page: number;
    limit: number;
  }) {
    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
        {
          user: {
            nickname: { contains: search },
          },
        },
      ];
    }

    const [posts, total] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, nickname: true } },
          _count: { select: { comments: true, likes: true } },
        },
      }),
      this.prisma.post.count({ where }),
    ]);

    return {
      data: posts.map((post) => ({
        ...post,
        commentsCount: post._count.comments,
        likesCount: post._count.likes,
      })),
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async getPostDetail(postId: number) {
    const post = await this.prisma.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
      include: {
        user: { select: { id: true, nickname: true } },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: { select: { id: true, nickname: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: { comments: true, likes: true },
        },
      },
    });

    if (!post) {
      throw new BusinessException(ErrorCode.Post.POST_NOT_FOUND, ErrorMessage.Post.POST_NOT_FOUND);
    }

    return {
      ...post,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
    };
  }

  async updatePost(userId: string, postId: number, dto: UpdatePostDto) {
    const post = await this.getPostOrThrow(postId);
    if (post.userId !== userId) {
      throw new BusinessException(ErrorCode.Post.ACCESS_DENIED, ErrorMessage.Post.ACCESS_DENIED);
    }

    return this.prisma.post.update({
      where: { id: postId },
      data: {
        title: dto.title,
        content: dto.content,
        category: dto.category,
      },
    });
  }

  async deletePost(userId: string, postId: number) {
    const post = await this.getPostOrThrow(postId);
    if (post.userId !== userId) {
      throw new BusinessException(ErrorCode.Post.NO_PERMISSION, ErrorMessage.Post.NO_PERMISSION);
    }
    await this.prisma.post.delete({ where: { id: postId } });
  }

  async likePost(userId: string, postId: number) {
    await this.getPostOrThrow(postId);
    const existing = await this.prisma.postLike.findFirst({ where: { postId, userId } });

    if (existing) {
      throw new BusinessException(
        ErrorCode.Post.POST_ALREADY_LIKED,
        ErrorMessage.Post.POST_ALREADY_LIKED,
      );
    }

    await this.prisma.postLike.create({ data: { postId, userId } });
    await this.prisma.post.update({
      where: { id: postId },
      data: { likesCount: { increment: 1 } },
    });
  }
}
