import { Injectable } from '@nestjs/common';
import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = 'UCoVz66yWHzVsXAFG8WhJK9g';

const TEAM_CHANNELS: Record<string, string> = {
  삼성: 'UCMWAku3a3h65QpLm63Jf2pw',
  롯데: 'UCAZQZdSY5_YrziMPqXi-Zfw',
  KIA: 'UCKp8knO8a6tSI1oaLjfd9XA',
  NC: 'UC8_FRgynMX8wlGsU6Jh3zKg',
  LG: 'UCL6QZZxb-HR4hCh_eFAnQWA',
  두산: 'UCsebzRfMhwYfjeBIxNX1brg',
  한화: 'UCdq4Ji3772xudYRUatdzRrg',
  키움: 'UC_MA8-XEaVmvyayPzG66IKg',
  KT: 'UCvScyjGkBUx2CJDMNAi9Twg',
  SSG: 'UCt8iRtgjVqm5rJHNl1TUojg',
};

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
        maxResults: 50,
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
  async getTeamHighlights(teamName: string, maxResults = 5) {
    const channelId = TEAM_CHANNELS[teamName];

    const res = await axios.get(`${this.baseUrl}/search`, {
      params: {
        part: 'snippet',
        channelId,
        key: process.env.YOUTUBE_API_KEY,
        maxResults,
        order: 'date',
        type: 'video',
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
