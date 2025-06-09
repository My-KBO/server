import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(data: {
    email: string;
    password: string;
    nickname: string;
    favorite_team?: string;
  }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        id: data.email,
        password: hashed,
        nickname: data.nickname,
        favorite_team: data.favorite_team,
      },
    });
    return { id: user.id, nickname: user.nickname };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { id: email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const pwValid = await bcrypt.compare(password, user.password);
    if (!pwValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
