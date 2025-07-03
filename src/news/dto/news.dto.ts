import { ApiProperty } from '@nestjs/swagger';

export class NewsDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  writer: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  media: string;

  @ApiProperty()
  url: string;

  @ApiProperty({ required: false, nullable: true })
  thumbnail?: string;
}
