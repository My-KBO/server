import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '닉네임' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: '한화 이글스', required: false })
  @IsString()
  favorite_team?: string;
}
