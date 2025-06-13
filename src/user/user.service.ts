import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/constants/error-code';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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

    if (!user) throw new BusinessException(ErrorCode.USER_NOT_FOUND, '사용자를 찾을 수 없습니다.');
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BusinessException(ErrorCode.USER_NOT_FOUND, '사용자를 찾을 수 없습니다.');

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        nickname: dto.nickname,
        favoriteTeam: dto.favoriteTeam,
      },
    });
  }

  async deleteAccount(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BusinessException(ErrorCode.USER_NOT_FOUND, '사용자를 찾을 수 없습니다.');

    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async getMyPosts(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BusinessException(ErrorCode.USER_NOT_FOUND, '사용자를 찾을 수 없습니다.');

    return this.prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMyComments(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BusinessException(ErrorCode.USER_NOT_FOUND, '사용자를 찾을 수 없습니다.');

    return this.prisma.comment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMyLikedPosts(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BusinessException(ErrorCode.USER_NOT_FOUND, '사용자를 찾을 수 없습니다.');

    return this.prisma.postLike.findMany({
      where: { userId },
      include: {
        post: true,
      },
    });
  }
}
