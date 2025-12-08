import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SerieController, MangaController } from './controllers';
import { SerieService, MangaService } from './services';
import { Serie, SerieSchema } from './entities/serie.entity';
import { Manga, MangaSchema } from './entities/manga.entity';


@Module({
  controllers: [SerieController, MangaController],
  providers: [SerieService, MangaService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Serie.name,
        schema: SerieSchema,
      },
      {
        name: Manga.name,
        schema: MangaSchema,
      },
    ])
  ],
  exports: [SerieService, MangaService]
})
export class SerieModule {}
