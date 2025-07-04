import { Controller, Get, Param } from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiTags, ApiOperation, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { TeamHotPostDto } from './dto/team-hot-post.dto';

@ApiTags('Team Dashboard')
@Controller('api/v1/teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(':teamName/schedule')
  @ApiOperation({ summary: '팀별 향후 4경기 일정 조회' })
  @ApiParam({ name: 'teamName', example: 'LG' })
  getUpcomingSchedule(@Param('teamName') teamName: string) {
    return this.teamService.getUpcomingSchedule(teamName);
  }
  @Get(':teamName/results')
  @ApiOperation({ summary: '팀별 최근 6경기 결과 조회' })
  @ApiParam({ name: 'teamName', example: 'LG' })
  getRecentResults(@Param('teamName') teamName: string) {
    return this.teamService.getRecentResults(teamName);
  }
  @Get(':teamName/topplayers')
  @ApiOperation({ summary: '팀별 인기 선수 조회 (타자/투수)' })
  @ApiParam({ name: 'teamName', example: 'LG' })
  getTopPlayers(@Param('teamName') teamName: string) {
    return this.teamService.getTopPlayers(teamName);
  }
  @Get(':teamName/hotposts')
  @ApiOperation({ summary: '팀 응원글 상위 2개 조회' })
  @ApiOkResponse({ type: [TeamHotPostDto] })
  async getTeamHotPosts(@Param('teamName') teamName: string): Promise<TeamHotPostDto[]> {
    return this.teamService.getHotPosts(teamName);
  }
}
