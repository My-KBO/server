import { Controller, Get, Param } from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

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
}
