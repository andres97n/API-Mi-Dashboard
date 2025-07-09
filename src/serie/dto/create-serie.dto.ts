import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsOptional, IsPositive, IsString, IsUrl, MinLength  } from 'class-validator';
import { Transform } from 'class-transformer';

import { SerieEmissionStatus, SerieStatus, SerieType, SerieViewStatus } from 'src/common/constants';
import { getDateFromString } from 'src/common/utils';
import { SerieEmissionStatusEnum, SerieStatusEnum, SerieTypeEnum, SerieViewStatusEnum } from 'src/common/enums';


export class CreateSerieDto {
  @ApiProperty({
    example: 'Dragon Ball Z',
    description: 'Nombre de la serie',
    required: true,
  })
  @IsString()
  @MinLength(2)
  readonly name: string;

  @ApiProperty({
    example: 1,
    description: 'ID externo de la serie',
    required: true,
  })
  @IsString()
  @MinLength(1)
  readonly externalId: string;

  @ApiProperty({
    example: 'ANIME_SERIES',
    description: 'Tipo de serie',
    required: true,
    enum: [...SerieType],
  })
  @IsEnum(SerieTypeEnum)
  readonly type: SerieTypeEnum;

  @ApiProperty({
    example: 'Synopsis de la serie',
    description: 'Sinopsis de la serie',
    required: true,
  })
  @IsString()
  @MinLength(10)
  @IsOptional()
  readonly synopsis: string;

  @ApiProperty({
    example: 300,
    description: 'Número de episodios de la serie',
    required: false,
  })
  @IsInt()
  @IsOptional()
  readonly episodeCount: number;

  @ApiProperty({
    example: '1990-04-26',
    description: 'Fecha de inicio de la serie',
    required: true,
  })
  @IsDate()
  @Transform(({ value }) => getDateFromString(value))
  readonly startDate: string;
  
  @ApiProperty({
    example: '1990-04-26',
    description: 'Fecha de finalización de la serie',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => getDateFromString(value))
  readonly endDate: string;
  
  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'URL del poster de la serie',
    required: true,
  })
  @IsUrl()
  readonly posterImageUrl: string;

  @ApiProperty({
    example: 'https://example.com/banner.jpg',
    description: 'URL del banner de la serie',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  readonly bannerImageUrl: string;

  @ApiProperty({
    example: 'EMPTY',
    description: 'Estado de almacenamiento de la serie',
    required: false,
    enum: [...SerieStatus],
  })
  @IsEnum(SerieStatusEnum)
  readonly status: SerieStatusEnum;
  
  @ApiProperty({
    example: 'SERIES_NOT_STARTED',
    description: 'Estado de emisión de la serie',
    required: false,
    enum: [...SerieEmissionStatus]
  })
  @IsEnum(SerieEmissionStatusEnum)
  readonly emissionStatus: SerieEmissionStatusEnum;
  
  @ApiProperty({
    example: 'UNSEEN_SERIES',
    description: 'Estado de visualización de la serie',
    required: false,
    enum: [...SerieViewStatus]
  })
  @IsEnum(SerieViewStatusEnum)
  readonly viewStatus: SerieViewStatusEnum;
  
  @ApiProperty({
    example: 50,
    description: 'Progreso de descarga de la serie',
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly progress: number;

}
