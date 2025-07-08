import { Injectable } from '@nestjs/common';
import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = 'UCoVz66yWHzVsXAFG8WhJK9g';

@Injectable()
export class HighlightService {
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  async searchHighlights(query: string, maxResults = 5) {
    const res = await axios.get(`${this.baseUrl}/search`, {
      params: {
        part: 'snippet',
        q: `${query} 하이라이트`,
        key: YOUTUBE_API_KEY,
        channelId: YOUTUBE_CHANNEL_ID,
        maxResults,
        type: 'video',
        order: 'date',
      },
    });

    return res.data.items.map((item: any) => ({
      title: item.snippet.title,
      publishedAt: new Date(item.snippet.publishedAt).toISOString().slice(0, 10),
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.high.url,
    }));
  }
}
