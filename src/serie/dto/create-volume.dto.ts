import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEnum, IsMongoId, IsNumber, IsOptional, IsPositive, IsString, IsUrl, MinLength } from "class-validator";
import { Transform } from "class-transformer";

import { LoinTypeEnum, PurchaseStatusEnum } from "../enums";
import { POSTER_IMAGE_DEFAULT_URL, VOLUME_BOUGHT } from "../constants";
import { getDateFromString } from "src/common/utils";


export class CreateVolumeDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'ID del manga asociado',
    required: true,
  })
  @IsMongoId()
  readonly idManga: string;
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'ID del boxset asociado',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  readonly idBoxset?: string | null;

  @ApiProperty({
    example: POSTER_IMAGE_DEFAULT_URL,
    description: 'Imagen del póster del tomo',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  readonly posterUrl?: string;

  @ApiProperty({
    example: 42,
    description: 'Número de tomo del manga',
    required: true,
  })
  @IsNumber()
  @IsPositive()
  readonly volumeNumber: number;

  @ApiProperty({
    example: 200,
    description: 'Número de páginas del volúmen',
    required: true,
  })
  @IsNumber()
  @IsPositive()
  readonly pagesNumber: number;

  @ApiProperty({
    example: 20.50,
    description: 'Precio del volúmen (USD)',
    required: true,
  })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: "1984-11-20",
    description: 'Fecha de publicación del tomo',
    required: true,
  })
  @IsDate()
  @Transform(({ value }) => getDateFromString(value))
  readonly publicationDate: Date;

  @ApiProperty({
    example: 'Detalles',
    description: 'Detalles del volúmen',
    required: false,
  })
  @IsString()
  @MinLength(2)
  @IsOptional()
  readonly details?: string;

  @ApiProperty({
    example: '978-1421599779',
    description: 'ISBN del tomo',
    required: false,
  })
  @IsString()
  @MinLength(2)
  @IsOptional()
  readonly isbn?: string;

  @ApiProperty({
    example: VOLUME_BOUGHT,
    description: "Estado de compra",
    required: false,
    enum: PurchaseStatusEnum,
  })
  @IsEnum(PurchaseStatusEnum)
  @IsOptional()
  readonly purchaseStatus?: PurchaseStatusEnum;

  @ApiProperty({
    example: LoinTypeEnum.paperback,
    description: "Tipo de lomo del tomo",
    required: false,
    enum: LoinTypeEnum,
  })
  @IsEnum(LoinTypeEnum)
  @IsOptional()
  readonly loinType?: LoinTypeEnum;

  @ApiProperty({
    example: "https://amazon.com",
    description: 'Información acerca del cofre',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  readonly informationUrl?: string;

  @ApiProperty({
    example: true,
    description: 'Es edición especial?',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly isEspecialEdition?: boolean;
}