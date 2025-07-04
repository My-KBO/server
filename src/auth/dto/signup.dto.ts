import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6) // Todo : 최소 길이 정해야함함
  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @ApiProperty({ example: '닉네임' })
  @IsString()
  nickname: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '한화 이글스', required: false })
  favoriteTeam?: string;
}
