import { Injectable, Logger, Inject, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Manga } from "../entities";
import { CreateSerieWithMangaDto } from "../dto";
import { GenericService } from "src/common/services";
import { SerieService } from "./serie.service";
import { KitsuApiService } from "src/kitsu-api/kitsu-api.service";
import { createMangaSerie, updateMangaSerie } from "../helpers";


@Injectable()
export class MangaService extends GenericService<Manga> {
  private readonly logger = new Logger(MangaService.name);

  constructor(
    @InjectModel( Manga.name ) 
    private readonly mangaModel: Model<Manga>,
    private readonly serieService: SerieService,
    @Inject(forwardRef(() => KitsuApiService))
    private readonly kitsuApiService: KitsuApiService,

  ) {
    super(mangaModel);
  }

  async createMangaAndSerie(createSerieWithMangaDto: CreateSerieWithMangaDto) {
    this.logger.debug({msg: "data received", createSerieWithMangaDto});
   
    if (
      !createSerieWithMangaDto.externalId && 
      !createSerieWithMangaDto.startDate
    ) throw new Error("startDate is required");

    let serie = await createMangaSerie(
      this.serieService,
      this.kitsuApiService,
      createSerieWithMangaDto
    );
    if (!serie) throw new Error('Failed to create serie');

    serie = await updateMangaSerie(
      serie._id.toString(),
      createSerieWithMangaDto,
      this.serieService
    );
    if (!serie) throw new Error('Failed to create serie');

    const manga = await this.create({
      idSerie: serie._id.toString(),
      name: createSerieWithMangaDto.mangaEditionName,
      volumesNumber: createSerieWithMangaDto.volumesNumber,
      editorial: createSerieWithMangaDto.editorial,
      editorialCountry: createSerieWithMangaDto.editorialCountry,
      language: createSerieWithMangaDto.language,
    });
    if (!manga) throw new Error('Failed to create manga');

    return {
      serie, 
      manga
    }
  }
}