import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetTopPlayersResponseDto, TopPlayerDto } from './dto/top-player.dto';
import { TeamRankingDto } from './dto/team-ranking.dto';
import { TodayGameDto } from './dto/today-games.dto';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { fetchWeatherByStadium } from 'src/common/weather/get-weather';

@Injectable()
export class BaseballService {
  constructor(private readonly prisma: PrismaService) {}

  async getTopPlayers(): Promise<GetTopPlayersResponseDto> {
    const categories = ['타율', '홈런', '평균자책점', '승리'];

    const result: TopPlayerDto[] = await Promise.all(
      categories.map(async (category) => {
        const player = await this.prisma.playerStat.findFirst({
          where: { category },
          orderBy: { value: category === '평균자책점' ? 'asc' : 'desc' },
        });

        return {
          category,
          name: player?.name ?? '',
          team: player?.team ?? '',
          value: player?.value ?? '',
        };
      }),
    );

    return {
      hitter: result.filter((r) => r.category === '타율' || r.category === '홈런'),
      pitcher: result.filter((r) => r.category === '평균자책점' || r.category === '승리'),
    };
  }
  async getTeamRankings(): Promise<TeamRankingDto[]> {
    const rankings = await this.prisma.teamRank.findMany({
      orderBy: { rank: 'asc' },
    });

    return rankings.map((r) => ({
      rank: r.rank,
      team: r.team,
      games: r.games,
      win: r.win,
      lose: r.lose,
      draw: r.draw,
      winRate: r.winRate,
      gameGap: r.gameGap,
      streak: r.streak,
    }));
  }
  async getTodayGames(): Promise<TodayGameDto[]> {
    const now = new Date();
    const todayFormatted = format(now, 'MM.dd(eee)', { locale: ko });

    const games = await this.prisma.schedule.findMany({
      where: { date: todayFormatted },
      orderBy: { time: 'asc' },
    });

    return await Promise.all(
      games.map(async (game) => {
        const weather = await fetchWeatherByStadium(game.stadium);
        return {
          ...game,
          weather,
        };
      }),
    );
  }
}
