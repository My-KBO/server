import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateNicknameDto } from './dto/update-nickname.dto';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/constants/error/error-code';
import { ErrorMessage } from '../common/constants/error/error-message';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateTeamDto } from './dto/update-teat.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async getUserOrThrow(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BusinessException(ErrorCode.User.USER_NOT_FOUND, ErrorMessage.User.USER_NOT_FOUND);
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
      throw new BusinessException(ErrorCode.User.USER_NOT_FOUND, ErrorMessage.User.USER_NOT_FOUND);
    }

    return user;
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const user = await this.getUserOrThrow(userId);

    const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isMatch) {
      throw new BusinessException(
        ErrorCode.User.USER_PASSWORD_INCORRECT,
        ErrorMessage.User.USER_PASSWORD_INCORRECT,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return { message: '비밀번호가 성공적으로 변경되었습니다.' };
  }

  async updateNickname(userId: string, dto: UpdateNicknameDto) {
    await this.getUserOrThrow(userId);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        nickname: dto.newNickname,
      },
    });

    return { message: '닉네임이 성공적으로 변경되었습니다.' };
  }
  async updateFavoriteTeam(userId: string, dto: UpdateTeamDto) {
    await this.getUserOrThrow(userId);

    this.prisma.user.update({
      where: { id: userId },
      data: {
        favoriteTeam: dto.newFavoriteTeam,
      },
    });
    return { message: '좋아하는 팀이 성공적으로 변경되었습니다.' };
  }

  async deleteAccount(userId: string) {
    await this.getUserOrThrow(userId);

    await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: '회원 탈퇴가 완료되었습니다.' };
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
