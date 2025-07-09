import { IsString } from 'class-validator';

export class UpdateNicknameDto {
  @IsString()
  newNickname?: string;
}
