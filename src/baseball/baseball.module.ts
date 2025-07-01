import { Module } from '@nestjs/common';
import { BaseballController } from './baseball.controller';
import { BaseballService } from './baseball.service';

@Module({
  controllers: [BaseballController],
  providers: [BaseballService]
})
export class BaseballModule {}
