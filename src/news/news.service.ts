import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewsResponseDto } from './dto/news-response.dto';

const teamNames = ['삼성', 'LG', 'SSG', 'NC', 'KIA', '한화', '두산', '키움', 'KT', '롯데'];

function countTeamMentions(text: string): number {
  return teamNames.reduce((count, team) => count + (text.includes(team) ? 1 : 0), 0);
}

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async getLatestNews(): Promise<NewsResponseDto[]> {
    const news = await this.prisma.news.findMany({
      orderBy: { createdAt: 'asc' },
      take: 5,
    });

    return news.map(this.toDto);
  }

  async getTeamNews(teamName: string): Promise<NewsResponseDto[]> {
    const allNews = await this.prisma.news.findMany({
      orderBy: { createdAt: 'asc' },
    });

    const filtered = allNews.filter((item) => {
      const title = item.title;
      return title.includes(teamName) && countTeamMentions(title) === 1;
    });

    return filtered.slice(0, 5).map(this.toDto);
  }

  private toDto(news: any): NewsResponseDto {
    return {
      id: news.id,
      title: news.title,
      summary: news.summary,
      date: news.date,
      url: news.url,
      thumbnail: news.thumbnail,
    };
  }
}
