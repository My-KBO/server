import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { fetchWeatherByStadium } from '../common/weather/get-weather';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async getUpcomingSchedule(teamName: string) {
    const now = new Date();
    const todayFormatted = format(now, 'MM.dd(eee)', { locale: ko });

    const upcomingGames = await this.prisma.schedule.findMany({
      where: {
        OR: [{ homeTeam: teamName }, { awayTeam: teamName }],
        date: {
          gte: todayFormatted,
        },
      },
      orderBy: { date: 'asc' },
      take: 4,
    });

    const gamesWithWeather = await Promise.all(
      upcomingGames.map(async (game) => {
        const stadium = game.stadium;

        const weather = await fetchWeatherByStadium(stadium);
        return {
          ...game,
          weather,
        };
      }),
    );

    return gamesWithWeather;
  }
  async getRecentResults(teamName: string) {
    const now = new Date();
    const todayFormatted = format(now, 'MM.dd(eee)', { locale: ko });

    const recentGames = await this.prisma.schedule.findMany({
      where: {
        AND: [
          {
            OR: [{ homeTeam: teamName }, { awayTeam: teamName }],
          },
          {
            date: {
              lt: todayFormatted,
            },
          },
        ],
      },
      orderBy: { date: 'desc' },
      take: 6,
    });

    return recentGames;
  }
  async getTopPlayers(teamName: string) {
    const hitters = await this.prisma.teamTopPlayer.findFirst({
      where: { team: teamName, type: '타자' },
      orderBy: { id: 'desc' },
    });

    const pitchers = await this.prisma.teamTopPlayer.findFirst({
      where: { team: teamName, type: '투수' },
      orderBy: { id: 'desc' },
    });

    return {
      타자: hitters
        ? {
            name: hitters.name,
            game: hitters.game,
            value: hitters.value,
          }
        : null,

      투수: pitchers
        ? {
            name: pitchers.name,
            game: pitchers.game,
            value: pitchers.value,
          }
        : null,
    };
  }
}
