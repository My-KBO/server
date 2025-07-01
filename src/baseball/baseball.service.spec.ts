import { Test, TestingModule } from '@nestjs/testing';
import { BaseballService } from './baseball.service';

describe('BaseballService', () => {
  let service: BaseballService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseballService],
    }).compile();

    service = module.get<BaseballService>(BaseballService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
