import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/constants/error/error-code';
import { ErrorMessage } from '../common/constants/error/error-message';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    const hashedPassword = await this.hashPassword(dto.password);

    await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        nickname: dto.nickname,
        favoriteTeam: dto.favoriteTeam,
      },
    });

    return {
      message: '회원가입이 완료되었습니다.',
    };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BusinessException(ErrorCode.User.USER_NOT_FOUND, ErrorMessage.User.USER_NOT_FOUND);
    }

    const isValid = await this.comparePassword(dto.password, user.password);
    if (!isValid) {
      throw new BusinessException(
        ErrorCode.User.INVALID_PASSWORD,
        ErrorMessage.User.INVALID_PASSWORD,
      );
    }

    const payload = { sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwt.accessTokenExpiresIn'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn'),
    });

    await this.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refresh(
    userId: string,
    oldRefreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.refreshToken !== oldRefreshToken) {
      throw new BusinessException(
        ErrorCode.User.INVALID_REFRESH_TOKEN,
        ErrorMessage.User.INVALID_REFRESH_TOKEN,
      );
    }

    const payload = { sub: userId };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwt.accessTokenExpiresIn'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn'),
    });

    await this.saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      await this.prisma.user.updateMany({
        where: {
          id: payload.sub,
          refreshToken: refreshToken,
        },
        data: { refreshToken: null },
      });
    } catch (e) {
      console.error('Logout error:', e);
    }
  }

  private async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async comparePassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
