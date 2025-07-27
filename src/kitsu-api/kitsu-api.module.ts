import { Module } from '@nestjs/common';

import { KitsuApiService } from './kitsu-api.service';
import { KitsuApiController } from './kitsu-api.controller';
import { ReplaceKitsuApiUrlInterceptor } from './interceptors';


@Module({
  controllers: [KitsuApiController],
  providers: [KitsuApiService, ReplaceKitsuApiUrlInterceptor],
})
export class KitsuApiModule {}
