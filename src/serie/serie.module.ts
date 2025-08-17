import { Module } from '@nestjs/common';

import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Serie, SerieSchema } from './entities/serie.entity';


@Module({
  controllers: [SerieController],
  providers: [SerieService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Serie.name,
        schema: SerieSchema,
      },
    ])
  ],
  exports: [SerieService]
})
export class SerieModule {}
