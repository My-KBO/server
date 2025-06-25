import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [PrismaModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
