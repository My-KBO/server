import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { BaseballModule } from './baseball/baseball.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { TeamModule } from './team/team.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    BaseballModule,
    ScheduleModule,
    ConfigModule,
    PrismaModule,
    CommentModule,
    TeamModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
