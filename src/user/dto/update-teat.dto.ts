import { IsString } from 'class-validator';

export class UpdateTeamDto {
  @IsString()
  newFavoriteTeam?: string;
}
