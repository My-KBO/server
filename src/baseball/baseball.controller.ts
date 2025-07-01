import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseballService } from './baseball.service';
import { TeamRankingDto } from './dto/team-ranking.dto';
import { GetTopPlayersResponseDto } from './dto/top-player.dto';
import { TodayGameDto } from './dto/today-games.dto';

@ApiTags('baseball')
@Controller('api/v1/baseball')
export class BaseballController {
  constructor(private readonly baseballService: BaseballService) {}

  @Get('rankings')
  @ApiOperation({ summary: '전체 팀 순위 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [TeamRankingDto] })
  async getRankings(): Promise<TeamRankingDto[]> {
    return this.baseballService.getTeamRankings();
  }

  @Get('topplayer')
  @ApiOperation({ summary: '플레이어 1위 랭킹' })
  @ApiResponse({ status: 200, type: GetTopPlayersResponseDto })
  async getTopPlayers(): Promise<GetTopPlayersResponseDto> {
    return this.baseballService.getTopPlayers();
  }

  @Get('games/today')
  @ApiOperation({ summary: '오늘의 경기 일정 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [TodayGameDto] })
  async getTodayGames(): Promise<TodayGameDto[]> {
    return this.baseballService.getTodayGames();
  }
}
