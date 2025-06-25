import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
  ) {}

  async signup(dto: SignupDto): Promise<{ id: string; email: string; nickname: string }> {
    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        nickname: dto.nickname,
        favoriteTeam: dto.favoriteTeam,
      },
    });

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
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
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async comparePassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
