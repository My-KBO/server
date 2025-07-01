import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseballService } from './baseball.service';

@ApiTags('baseball')
@Controller('api/v1/baseball')
export class BaseballController {
  constructor(private readonly baseballService: BaseballService) {}

  @ApiOperation({ summary: '전체 팀 순위' })
  @ApiResponse({ status: 200, type: [GetTeamRankingResponseDto] })
  @Get('rankings')
  async getTeamRankings() {
    return this.baseballService.getTeamRankings();
  }

  @ApiOperation({ summary: '플레이어 순위 (타자/투수)' })
  @ApiResponse({ status: 200, type: [GetTopPlayerResponseDto] })
  @Get('topplayer')
  async getTopPlayers() {
    return this.baseballService.getTopPlayers();
  }

  @ApiOperation({ summary: '오늘의 경기 일정' })
  @ApiResponse({ status: 200, type: [GetTodayGameResponseDto] })
  @Get('games/today')
  async getTodayGames() {
    return this.baseballService.getTodayGames();
  }
}
