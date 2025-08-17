import { Injectable } from '@nestjs/common';

import { SearchKitsuApiDto } from './dto';
import { getKitsuErrorById, kitsuFindOneValidation } from './helpers';
import { AxiosAdapter } from 'src/common/adapters';
import { KitsuAnime, KitsuMainIndividualResponse, KitsuResponse } from './interfaces';
import { KITSU_API_BASE_URL, KITSU_ATTRIBUTE_DEFAULT } from './constants';
import { SerieService } from 'src/serie/serie.service';
import { CreateSerieDto } from 'src/serie/dto/create-serie.dto';
import { 
  SerieEmissionStatusEnum, 
  SerieStatusEnum, 
  SerieTypeEnum, 
  SerieViewStatusEnum 
} from 'src/serie/enums';
import { 
  BANNER_IMAGE_DEFAULT, 
  POSTER_IMAGE_DEFAULT, 
  SYNOPSIS_DEFAULT 
} from 'src/serie/constants';


@Injectable()
export class KitsuApiService {

  constructor(
    private readonly http: AxiosAdapter,
    private readonly serieService: SerieService,
  ) {}

  async findAll(kitsuSearchDto: SearchKitsuApiDto) {
    const { name, reference, attribute, pageLimit, pageOffset } = kitsuSearchDto;
    const attributeParam = attribute ?? KITSU_ATTRIBUTE_DEFAULT;
    const pageLimitUrl = pageLimit ? `&page[limit]=${pageLimit}` : '';
    const pageOffsetUrl = pageOffset ? `&page[offset]=${pageOffset}` : '';
  
    const { data, meta, links } = await this.http.get<KitsuResponse>(
      `${KITSU_API_BASE_URL}${reference}?filter[${attributeParam}]=${name}${pageLimitUrl}${pageOffsetUrl}`
    );
  
    
    return {
      data,
      meta: {
        count: meta?.count ?? 0,
        ...(meta?.total && { total: meta.total }),
        ...(links?.first ? { first: links.first } : { first: '' }),
        ...(links?.last ? { last: links.last } : { last: '' }),
        ...(links?.next && { next: links.next }),
        ...(links?.prev && { prev: links.prev }),
      }
    }
  }

  async findOne(id: number, type: string = 'anime') {
    kitsuFindOneValidation(id, type);

    const { data } = await this.http.get<KitsuMainIndividualResponse>(
      `${KITSU_API_BASE_URL}${type}/${id}`,
      getKitsuErrorById
    );

    return data;
  }

  async findAdditionalKitsuInformation(params: string[]) {
    let kitsuAdditionalInfoUrl = KITSU_API_BASE_URL;
    params.forEach((value, index) => {
      kitsuAdditionalInfoUrl += index === 0 ? `${value}` : `/${value}`;
    });

    const { data } = await this.http.get<KitsuMainIndividualResponse>(
      kitsuAdditionalInfoUrl,
      getKitsuErrorById
    );

    return data;
  }

  async createSerieByKitsuId(id: number) {
    const kitsuSerie = await this.findOne(id);
    const serieDetail = kitsuSerie.attributes as KitsuAnime;

    const newSerie: CreateSerieDto = {
      name: serieDetail.titles.en_jp || serieDetail.titles.en,
      externalId: kitsuSerie.id,
      type: SerieTypeEnum.animeSeries,
      synopsis: serieDetail.synopsis || SYNOPSIS_DEFAULT,
      episodeCount: serieDetail.episodeCount ?? 0,
      startDate: new Date(serieDetail.startDate || '').toISOString(),
      endDate: new Date(serieDetail.endDate || '').toISOString(),
      posterImageUrl: serieDetail.posterImage?.original || BANNER_IMAGE_DEFAULT,
      bannerImageUrl: serieDetail.coverImage?.original || POSTER_IMAGE_DEFAULT,
      status: SerieStatusEnum.empty,
      emissionStatus: SerieEmissionStatusEnum.serieNotStarted,
      viewStatus: SerieViewStatusEnum.unseenSeries,
      progress: 0
    };

    const existingSerie = await this.serieService.findOneWithoutException({
      externalId: kitsuSerie.id
    });
    if (existingSerie) return { data: existingSerie, message: "Serie already exists" };

    return this.serieService.create(newSerie);
  }
}
