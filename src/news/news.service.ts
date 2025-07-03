import { Injectable, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { NewsDto } from './dto/news.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  private readonly baseUrl = 'https://openapi.naver.com/v1/search/news.json';

  constructor(private readonly http: HttpService) {}

  async getLatestNews(query: string, display = 5): Promise<NewsDto[]> {
    try {
      const res = await this.http
        .get(this.baseUrl, {
          params: { query, display, sort: 'date' },
          headers: {
            'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
          },
        })
        .pipe(map((response: any) => response.data))
        .toPromise();

      return res.items.map((item) => ({
        title: item.title.replace(/<[^>]*>?/g, ''),
        writer: item.originallink,
        date: item.pubDate.split(' ')[0].replace(/-/g, '.'),
        media: item.source,
        url: item.link,
        thumbnail: item.thumbnail || null,
      }));
    } catch (e) {
      this.logger.error('Failed fetching news', e);
      return [];
    }
  }
}
