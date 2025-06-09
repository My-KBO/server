import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  password: string;

  @ApiProperty({ example: '닉네임' })
  nickname: string;

  @ApiProperty({ example: '한화 이글스', required: false })
  favorite_team?: string;
}
