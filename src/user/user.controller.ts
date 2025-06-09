import { Controller, Get, Patch, Delete, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User as UserEntity } from '@prisma/client';
import { User } from './user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/profile')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getProfile(@User() user: UserEntity) {
    return this.usersService.getProfile(user.id);
  }

  @Patch()
  updateProfile(@User() user: UserEntity, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.id, dto);
  }

  @Delete()
  deleteAccount(@User() user: UserEntity) {
    return this.usersService.deleteAccount(user.id);
  }

  @Get('posts')
  getMyPosts(@User() user: UserEntity) {
    return this.usersService.getMyPosts(user.id);
  }

  @Get('comments')
  getMyComments(@User() user: UserEntity) {
    return this.usersService.getMyComments(user.id);
  }

  @Get('likes')
  getMyLikedPosts(@User() user: UserEntity) {
    return this.usersService.getMyLikedPosts(user.id);
  }
}
