import { Body, Controller, Post, Res, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/v1/auth/refresh',
      sameSite: 'strict',
      secure: true,
    });

    return { accessToken };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Access Token 재발급' })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const oldRefreshToken = req.cookies['refreshToken'];
    const userId = (req as any).user?.sub;

    const { accessToken, refreshToken } = await this.authService.refresh(userId, oldRefreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/v1/auth/refresh',
      sameSite: 'strict',
      secure: true,
    });

    return { accessToken };
  }

  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const oldRefreshToken = req.cookies?.refreshToken;
    await this.authService.logout(oldRefreshToken);
    res.clearCookie('refreshToken');
    return { message: 'Logout success' };
  }
}
