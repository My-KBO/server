import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/constants/error-code';
import { ErrorMessage } from '../common/constants/error-message';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async getUserOrThrow(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BusinessException(ErrorCode.USER_NOT_FOUND, ErrorMessage.USER_NOT_FOUND);
    }
    return user;
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nickname: true,
        favoriteTeam: true,
      },
    });

    if (!user) {
      throw new BusinessException(ErrorCode.USER_NOT_FOUND, ErrorMessage.USER_NOT_FOUND);
    }

    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    await this.getUserOrThrow(userId);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        nickname: dto.nickname,
        favoriteTeam: dto.favoriteTeam,
      },
    });
  }

  async deleteAccount(userId: string) {
    await this.getUserOrThrow(userId);

    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async getMyPosts(userId: string) {
    await this.getUserOrThrow(userId);

    return this.prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMyComments(userId: string) {
    await this.getUserOrThrow(userId);

    return this.prisma.comment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMyLikedPosts(userId: string) {
    await this.getUserOrThrow(userId);

    return this.prisma.postLike.findMany({
      where: { userId },
      include: {
        post: true,
      },
    });
  }
}
