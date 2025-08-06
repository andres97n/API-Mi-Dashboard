import * as https from 'node:https';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SerieModule } from './serie/serie.module';
import { HttpModule } from '@nestjs/axios';

import { DEFAULT_MONGO_URI } from './common/constants';
import { KitsuApiModule } from './kitsu-api/kitsu-api.module';
import { RequestContext } from './common/providers';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DB_URI ?? DEFAULT_MONGO_URI
    ),
    
    HttpModule.register({
      global: true,
      timeout: 5000,
      maxRedirects: 5,
      httpsAgent: new https.Agent({ keepAlive: true }),
      // httpAgent: new http.Agent({ keepAlive: true }),
    }),

    SerieModule,

    KitsuApiModule,

    CommonModule
  ],
  controllers: [],
  providers: [RequestContext],
  exports: [RequestContext],
})
export class AppModule {}
