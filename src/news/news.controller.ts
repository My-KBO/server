import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags, ApiOperation, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { NewsDto } from './dto/news.dto';

@ApiTags('News')
@Controller('api/v1/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: '최신 뉴스 검색 (query 필수)' })
  @ApiQuery({ name: 'query', required: true, example: 'LG 트윈스' })
  @ApiOkResponse({ type: [NewsDto] })
  async getNews(@Query('query') query: string): Promise<NewsDto[]> {
    return this.newsService.getLatestNews(query);
  }
}
