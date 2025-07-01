import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BaseballService {
  constructor(private readonly prisma: PrismaService) {}

  async getTeamRankings(): Promise<GetTeamRankingResponseDto[]> {
    const data = await this.prisma.teamRanking.findMany({ orderBy: { rank: 'asc' } });
    return data;
  }

  async getTopPlayers(): Promise<GetTopPlayerResponseDto[]> {
    const hitters = await this.prisma.playerStat.findMany({
      where: { category: '타자' },
      orderBy: { value: 'desc' },
      take: 5,
    });

    const pitchers = await this.prisma.playerStat.findMany({
      where: { category: '투수' },
      orderBy: { value: 'asc' },
      take: 5,
    });

    return [...hitters, ...pitchers];
  }

  async getTodayGames(): Promise<GetTodayGameResponseDto[]> {
    const todayStr = new Date().toISOString().slice(0, 10);
    return await this.prisma.schedule.findMany({
      where: { date: todayStr },
      orderBy: { time: 'asc' },
    });
  }
}
