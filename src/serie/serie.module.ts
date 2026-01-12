import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SerieController, MangaController, VolumeController, BoxsetController } from './controllers';
import { SerieService, MangaService, VolumeService, BoxsetService } from './services';
import { Serie, SerieSchema } from './entities/serie.entity';
import { Manga, MangaSchema } from './entities/manga.entity';
import { KitsuApiModule } from 'src/kitsu-api/kitsu-api.module';
import { Boxset, BoxsetSchema, Volume, VolumeSchema } from './entities';


@Module({
  controllers: [
    SerieController, MangaController, 
    VolumeController, BoxsetController
  ],
  providers: [
    SerieService, MangaService, 
    VolumeService, BoxsetService
  ],
  imports: [
    forwardRef(() => KitsuApiModule),
    MongooseModule.forFeature([
      {
        name: Serie.name,
        schema: SerieSchema,
      },
      {
        name: Manga.name,
        schema: MangaSchema,
      },
      {
        name: Volume.name,
        schema: VolumeSchema,
      },
      {
        name: Boxset.name,
        schema: BoxsetSchema,
      },
    ]),
  ],
  exports: [SerieService, MangaService]
})
export class SerieModule {}
