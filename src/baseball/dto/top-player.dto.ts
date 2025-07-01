export class TopPlayerDto {
  category: string;
  name: string;
  team: string;
  value: string;
}

export class GetTopPlayersResponseDto {
  hitter: TopPlayerDto[];
  pitcher: TopPlayerDto[];
}
