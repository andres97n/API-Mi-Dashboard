import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

import { MANGA_LANGUAGES } from '../constants/manga.constant';
import { MangaLanguageEnum } from '../enums';


export class CreateMangaDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'ID de la serie asociada',
    required: true,
  })
  @IsMongoId()
  readonly idSerie: string;

  @ApiProperty({
    example: 'Naruto',
    description: 'Nombre del manga',
    required: true,
  })
  @IsString()
  @MinLength(2)
  readonly name: string;

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
  readonly isArtbook: boolean;
}

