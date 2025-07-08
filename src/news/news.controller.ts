import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsResponseDto } from './dto/news-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('News')
@Controller('api/v1')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('baseball/news')
  @ApiOperation({ summary: '메인화면 최신 뉴스 5개' })
  @ApiResponse({ status: 200, type: [NewsResponseDto] })
  async getMainNews(): Promise<NewsResponseDto[]> {
    return this.newsService.getLatestNews();
  }

  @Get('teams/:teamName/news')
  @ApiOperation({ summary: '팀 뉴스 5개' })
  @ApiParam({ name: 'teamName', example: '삼성', description: '팀 이름 (예: 삼성, LG)' })
  @ApiResponse({ status: 200, type: [NewsResponseDto] })
  async getTeamNews(@Param('teamName') teamName: string): Promise<NewsResponseDto[]> {
    return this.newsService.getTeamNews(teamName);
  }
}
