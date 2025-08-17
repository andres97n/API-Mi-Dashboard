import * as https from 'node:https';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { KitsuApiModule } from './kitsu-api/kitsu-api.module';
import { SerieModule } from './serie/serie.module';
import { RequestContext } from './common/providers';
import { CommonModule } from './common/common.module';
import { EnvConfiguration, JoiValidationSchema } from './config';


@Module({
  imports: [

    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbUri'),
      }),
    }),
    
    HttpModule.register({
      global: true,
      timeout: 5000,
      maxRedirects: 5,
      httpsAgent: new https.Agent({ keepAlive: true }),
      // httpAgent: new http.Agent({ keepAlive: true }),
    }),

    CommonModule,
    SerieModule,
    KitsuApiModule,

  ],
  controllers: [],
  providers: [RequestContext],
  exports: [RequestContext],
})
export class AppModule {}
