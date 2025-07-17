import * as https from 'node:https';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { DEFAULT_MONGO_URI } from './common/constants';


@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DB_URI ?? DEFAULT_MONGO_URI
    ),

    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      httpsAgent: new https.Agent({ keepAlive: true }),
      // httpAgent: new http.Agent({ keepAlive: true }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
