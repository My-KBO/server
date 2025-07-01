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
}
