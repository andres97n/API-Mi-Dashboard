import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SerieController } from './controllers';
import { SerieService } from './services';
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
