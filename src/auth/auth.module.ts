import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' }, // TODO : 임시 유효시간 등록, 액세스 토큰 유효시간 정해야함.
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
