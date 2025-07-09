import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: '사용자 이메일' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
