import { Module } from '@nestjs/common';
import { KitsuApiService } from './kitsu-api.service';
import { KitsuApiController } from './kitsu-api.controller';

@Module({
  controllers: [KitsuApiController],
  providers: [KitsuApiService],
})
export class KitsuApiModule {}
