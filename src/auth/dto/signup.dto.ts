import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @MinLength(6)
  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  password: string;

  @IsString()
  @MinLength(2)
  @ApiProperty({ example: '닉네임' })
  nickname: string;

  @IsString()
  @ApiProperty({ example: '한화 이글스', required: false })
  favoriteTeam?: string;
}
