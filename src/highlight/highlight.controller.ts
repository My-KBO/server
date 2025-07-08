import { Controller, Get, Param } from '@nestjs/common';
import { HighlightService } from './highlight.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Highlight')
@Controller('api/v1')
export class HighlightController {
  constructor(private readonly highLightService: HighlightService) {}

  @Get('baseball/highlight')
  @ApiOperation({ summary: '메인화면 최신 하이라이트 5개' })
  @ApiResponse({ status: 200, description: '성공' })
  async getMainHighlights() {
    return this.highLightService.searchHighlights('KBO X TVING');
  }

  @Get('teams/:teamName/highlight')
  @ApiOperation({ summary: '특정 팀 하이라이트 5개' })
  @ApiParam({ name: 'teamName', example: '삼성' })
  @ApiResponse({ status: 200, description: '성공' })
  async getTeamHighlights(@Param('teamName') teamName: string) {
    return this.highLightService.searchHighlights(teamName);
  }
}
