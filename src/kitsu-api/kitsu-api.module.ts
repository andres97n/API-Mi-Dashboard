import { Module } from '@nestjs/common';

import { KitsuApiService } from './kitsu-api.service';
import { KitsuApiController } from './kitsu-api.controller';
import { ReplaceKitsuApiUrlInterceptor } from './interceptors';
import { CommonModule } from 'src/common/common.module';


@Module({
  imports: [CommonModule],
  controllers: [KitsuApiController],
  providers: [KitsuApiService, ReplaceKitsuApiUrlInterceptor],
})
export class KitsuApiModule {}
