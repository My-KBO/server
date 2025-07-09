import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { BaseballModule } from './baseball/baseball.module';
import { ScheduleModule } from './schedule/schedule.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { TeamModule } from './team/team.module';
import { NewsModule } from './news/news.module';
import { HighlightModule } from './highlight/highlight.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    UserModule,
    PostModule,
    AuthModule,
    BaseballModule,
    ScheduleModule,
    PrismaModule,
    CommentModule,
    TeamModule,
    NewsModule,
    HighlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
