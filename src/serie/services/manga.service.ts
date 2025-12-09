import { Injectable, Logger, Inject, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { getSerieTypeLabel } from "../enums";
import { SERIE_MANGA_LABEL } from "../constants";
import { Manga } from "../entities";
import { CreateSerieWithMangaDto } from "../dto";
import { GenericService } from "src/common/services";
import { SerieService } from "./serie.service";
import { KitsuApiService } from "src/kitsu-api/kitsu-api.service";


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
    const {
      volumesNumber,
      editorial,
      editorialCountry,
      language,
      ...serieData
    } = createSerieWithMangaDto;
    this.logger.debug({msg: "data received", createSerieWithMangaDto});
    
    let serie;
    const type = createSerieWithMangaDto.type; 
    const typeLabel = type ? getSerieTypeLabel(type) : SERIE_MANGA_LABEL;

    if (createSerieWithMangaDto.externalId) {
      serie = await this.kitsuApiService.createSerieByKitsuId(
        + createSerieWithMangaDto.externalId,
        typeLabel,
        createSerieWithMangaDto.name
      )
    }

    if (!createSerieWithMangaDto.externalId) {
      serie = await this.serieService.create({
        ...serieData,
        type: typeLabel || type,
      } as any);
    }
    
    if (!serie) throw new Error('Failed to create serie');

    const manga = await this.create({
      idSerie: serie._id.toString(),
      volumesNumber,
      editorial,
      editorialCountry,
      language,
    });
    if (!manga) throw new Error('Failed to create manga');

    return {
      serie, 
      manga
    }
  }
}