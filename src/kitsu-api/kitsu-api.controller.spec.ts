import { Test, TestingModule } from '@nestjs/testing';
import { KitsuApiController } from './kitsu-api.controller';
import { KitsuApiService } from './kitsu-api.service';

describe('KitsuApiController', () => {
  let controller: KitsuApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KitsuApiController],
      providers: [KitsuApiService],
    }).compile();

    controller = module.get<KitsuApiController>(KitsuApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
