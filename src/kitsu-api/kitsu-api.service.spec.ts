import { Test, TestingModule } from '@nestjs/testing';
import { KitsuApiService } from './kitsu-api.service';

describe('KitsuApiService', () => {
  let service: KitsuApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KitsuApiService],
    }).compile();

    service = module.get<KitsuApiService>(KitsuApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
