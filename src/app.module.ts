import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { BaseballModule } from './baseball/baseball.module';
import { HighlightModule } from './highlight/highlight.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    BaseballModule,
    HighlightModule,
    ScheduleModule,
    ConfigModule,
    PrismaModule,
    CommentModule,
  ],
  controllers: [AppController, CommentController],
  providers: [AppService, CommentService],
})
export class AppModule {}
