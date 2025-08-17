import { Module } from '@nestjs/common';

import { KitsuApiService } from './kitsu-api.service';
import { KitsuApiController } from './kitsu-api.controller';
import { ReplaceKitsuApiUrlInterceptor } from './interceptors';
import { CommonModule } from 'src/common/common.module';
import { SerieModule } from 'src/serie/serie.module';


@Module({
  imports: [CommonModule, SerieModule],
  controllers: [KitsuApiController],
  providers: [KitsuApiService, ReplaceKitsuApiUrlInterceptor],
})
export class KitsuApiModule {}
