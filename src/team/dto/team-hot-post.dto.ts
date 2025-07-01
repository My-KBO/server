import { ApiProperty } from '@nestjs/swagger';

export class TeamHotPostDto {
  @ApiProperty({ example: '김팬' })
  nickname: string;

  @ApiProperty({ example: '정말 최고의 팀입니다!' })
  title: string;
}
