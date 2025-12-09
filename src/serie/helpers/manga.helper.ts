import { KitsuApiService } from "src/kitsu-api/kitsu-api.service";
import { SerieService } from "../services";
import { CreateSerieWithMangaDto } from "../dto";
import { getSerieTypeLabel, SerieTypeEnum } from "../enums";
import { SERIE_MANGA_LABEL } from "../constants";


export const createMangaSerie = async (
  serieService: SerieService,
  kitsuApiService: KitsuApiService,
  createSerieWithMangaDto: CreateSerieWithMangaDto
) => {
  const {
    volumesNumber,
    editorial,
    editorialCountry,
    language,
    ...serieData
  } = createSerieWithMangaDto;
  const type = createSerieWithMangaDto.type; 
  const typeLabel = type ? getSerieTypeLabel(type) : SERIE_MANGA_LABEL;

  if (createSerieWithMangaDto.externalId) {
    const result = await kitsuApiService.createSerieByKitsuId(
      + createSerieWithMangaDto.externalId,
      typeLabel,
      createSerieWithMangaDto.name
    );
    return (result as any)?.data || result;
  }

  return await serieService.create({
    ...serieData,
    type: SerieTypeEnum.mangaSeries,
  } as any);
} 

export const updateMangaSerie = async (
  id: string,
  createSerieWithMangaDto: CreateSerieWithMangaDto,
  serieService: SerieService
) => {
  const {
    type,
    status,
    emissionStatus,
    viewStatus,
    progress
  } = createSerieWithMangaDto;
  const newManga = {
    type: type ?? SerieTypeEnum["mangaSeries"],
    ...(status ? { status } : {}),
    ...(emissionStatus ? { emissionStatus } : {}),
    ...(viewStatus ? { viewStatus } : {}),
    ...(progress ? { progress } : {}),
  }

  return await serieService.update(
    id,
    newManga
  );
}