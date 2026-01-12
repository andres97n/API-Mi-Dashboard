import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUrl, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

import { BANNER_IMAGE_DEFAULT_URL, ID_EXTERNAL_DEFAULT, POSTER_IMAGE_DEFAULT_URL, SerieEmissionStatus, SerieStatus, SerieType, SerieViewStatus } from 'src/serie/constants';
import { MANGA_LANGUAGES } from '../constants/manga.constant';
import { getDateFromString } from 'src/common/utils';
import { SerieEmissionStatusEnum, SerieStatusEnum, SerieTypeEnum, SerieViewStatusEnum } from 'src/serie/enums';
import { MangaLanguageEnum } from '../enums';


export class CreateSerieWithMangaDto {
  @ApiProperty({
    example: 'Dragon Ball Z',
    description: 'Nombre de la serie',
    required: false,
  })
  @IsString()
  @MinLength(2)
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    example: 'Dragon Ball Z Legend',
    description: 'Nombre de la edición del manga',
    required: true,
  })
  @IsString()
  @MinLength(2)
  readonly mangaEditionName: string;

  @ApiProperty({
    example: 1,
    description: 'ID externo de la serie',
    required: false,
    default: ID_EXTERNAL_DEFAULT
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  readonly externalId?: string;

  @ApiProperty({
    example: 'MANGA_SERIES',
    description: 'Tipo de serie',
    required: false,
    enum: [...SerieType],
    default: "MANGA_SERIES"
  })
  @IsEnum(SerieTypeEnum)
  @IsOptional()
  readonly type: SerieTypeEnum;

  @ApiProperty({
    example: 'Synopsis de la serie',
    description: 'Sinopsis de la serie',
    required: false,
  })
  @IsString()
  @MinLength(10)
  @IsOptional()
  readonly synopsis?: string;

  @ApiProperty({
    example: 'Autor de la serie',
    description: 'Autor de la serie',
    required: true,
  })
  @IsString()
  @MinLength(3)
  readonly author: string;

  @ApiProperty({
    example: 300,
    description: 'Número de episodios de la serie',
    required: false,
    default: 0
  })
  @IsInt()
  @IsOptional()
  readonly episodeCount?: number;

  @ApiProperty({
    example: '1990-04-26',
    description: 'Fecha de inicio de la serie',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => value ? getDateFromString(value) : "")
  readonly startDate?: string;
  
  @ApiProperty({
    example: '1990-04-26',
    description: 'Fecha de finalización de la serie',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => getDateFromString(value))
  readonly endDate?: string;
  
  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'URL del poster de la serie',
    required: false,
    default: POSTER_IMAGE_DEFAULT_URL
  })
  @IsUrl()
  @IsOptional()
  readonly posterImageUrl?: string;

  @ApiProperty({
    example: 'https://example.com/banner.jpg',
    description: 'URL del banner de la serie',
    required: false,
    default: BANNER_IMAGE_DEFAULT_URL
  })
  @IsUrl()
  @IsOptional()
  readonly bannerImageUrl?: string;

  @ApiProperty({
    example: 'EMPTY',
    description: 'Estado de almacenamiento de la serie',
    required: false,
    enum: [...SerieStatus],
  })
  @IsEnum(SerieStatusEnum)
  @IsOptional()
  readonly status?: SerieStatusEnum;
  
  @ApiProperty({
    example: 'SERIES_NOT_STARTED',
    description: 'Estado de emisión de la serie',
    required: false,
    enum: [...SerieEmissionStatus]
  })
  @IsEnum(SerieEmissionStatusEnum)
  @IsOptional()
  readonly emissionStatus?: SerieEmissionStatusEnum;

  @ApiProperty({
    example: 'UNSEEN_SERIES',
    description: 'Estado de visualización de la serie',
    required: false,
    enum: [...SerieViewStatus]
  })
  @IsEnum(SerieViewStatusEnum)
  @IsOptional()
  readonly viewStatus?: SerieViewStatusEnum;

  @ApiProperty({
    example: 50,
    description: 'Progreso de compra de la serie',
    required: false,
    default: 0,
    maximum: 100
  })
  @IsInt()
  @IsOptional()
  readonly progress?: number;

//Manga Fields
  @ApiProperty({
    example: 42,
    description: 'Número de volúmenes del manga',
    required: true,
  })
  @IsNumber()
  @IsPositive()
  readonly volumesNumber: number;

  @ApiProperty({
    example: 'Editorial Panini',
    description: 'Nombre de la editorial',
    required: true,
  })
  @IsString()
  @MinLength(2)
  readonly editorial: string;

  @ApiProperty({
    example: 'España',
    description: 'País de la editorial',
    required: true,
  })
  @IsString()
  @MinLength(2)
  readonly editorialCountry: string;

  @ApiProperty({
    example: 'Castellano',
    description: 'Idioma del manga',
    required: true,
    enum: [...MANGA_LANGUAGES],
  })
  @IsEnum(MangaLanguageEnum)
  readonly language: MangaLanguageEnum;

  @ApiProperty({
    example: true,
    description: 'Es un Artbook',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly isArtbook: boolean;
}

