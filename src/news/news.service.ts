import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewsResponseDto } from './dto/news-response.dto';

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
    const news = await this.prisma.news.findMany({
      where: {
        OR: [{ title: { contains: teamName } }, { summary: { contains: teamName } }],
      },
      orderBy: { createdAt: 'asc' },
      take: 5,
    });

    return news.map(this.toDto);
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
