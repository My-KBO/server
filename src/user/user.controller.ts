import { Controller, Get, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorator/user.decorator';
import { UpdateNicknameDto } from './dto/update-nickname.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateTeamDto } from './dto/update-teat.dto';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiResponse({ status: 200, description: '유저 정보 조회 성공' })
  getProfile(@User('id') userId: string) {
    return this.userService.getProfile(userId);
  }

  @Patch('profile/password')
  @ApiOperation({ summary: '내 정보 비밀번호 수정' })
  @ApiResponse({ status: 200, description: '유저 정보 수정 성공' })
  updateProfile(@User('id') userId: string, @Body() dto: UpdatePasswordDto) {
    return this.userService.updatePassword(userId, dto);
  }
  @Patch('profile/nickname')
  @ApiOperation({ summary: '내 정보 닉네임 수정' })
  @ApiResponse({ status: 200, description: '유저 정보 수정 성공' })
  updateNickname(@User('id') userId: string, @Body() dto: UpdateNicknameDto) {
    return this.userService.updateNickname(userId, dto);
  }
  @Patch('profile/team')
  @ApiOperation({ summary: '내 정보 좋아하는 팀 수정' })
  @ApiResponse({ status: 200, description: '유저 정보 수정 성공' })
  updateFavoriteTeam(@User('id') userId: string, @Body() dto: UpdateTeamDto) {
    return this.userService.updateFavoriteTeam(userId, dto);
  }

  @Delete('profile')
  @ApiOperation({ summary: '내 계정 삭제' })
  @ApiResponse({ status: 204, description: '계정 삭제 성공 (No Content)' })
  deleteAccount(@User('id') userId: string) {
    return this.userService.deleteAccount(userId);
  }

  @Get('profile/posts')
  @ApiOperation({ summary: '내가 작성한 게시글 목록 조회' })
  @ApiResponse({ status: 200, description: '작성 게시글 목록 반환' })
  getMyPosts(@User('id') userId: string) {
    return this.userService.getMyPosts(userId);
  }

  @Get('profile/comments')
  @ApiOperation({ summary: '내가 작성한 댓글 목록 조회' })
  @ApiResponse({ status: 200, description: '작성 댓글 목록 반환' })
  getMyComments(@User('id') userId: string) {
    return this.userService.getMyComments(userId);
  }

  @Get('profile/likes')
  @ApiOperation({ summary: '내가 좋아요 누른 게시글 목록 조회' })
  @ApiResponse({ status: 200, description: '좋아요 누른 게시글 목록 반환' })
  getMyLikedPosts(@User('id') userId: string) {
    return this.userService.getMyLikedPosts(userId);
  }
}
