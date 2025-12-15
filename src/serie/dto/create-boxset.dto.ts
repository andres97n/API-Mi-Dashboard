import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from "class-validator";

import { BANNER_IMAGE_DEFAULT_URL, VOLUME_BOUGHT } from "../constants";
import { PurchaseStatusEnum } from "../enums";


export class CreateBoxsetDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'ID del manga asociado',
    required: true,
  })
  @IsMongoId()
  readonly idManga: string;

  @ApiProperty({
    example: "Drangon Ball - Cofre 1",
    description: 'Nombre del Cofre',
    required: true,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 6,
    description: 'Peso del cofre',
    required: true,
  })
  @IsNumber()
  @IsPositive()
  readonly weight: number;

  @ApiProperty({
    example: 2000,
    description: 'Número de páginas del cofre',
    required: true,
  })
  @IsNumber()
  @IsPositive()
  readonly pagesNumber: number;

  @ApiProperty({
    example: BANNER_IMAGE_DEFAULT_URL,
    description: 'Imagen del cofre',
    required: true,
  })
  @IsUrl()
  readonly imageUrl: string;

  @ApiProperty({
    example: 20.50,
    description: 'Precio del volúmen (USD)',
    required: true,
  })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: 1,
    description: 'Número de cofre',
    required: true,
  })
  @IsNumber()
  boxsetNumber: number;

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
    example: "17.5 x 20 x 25.5 cm",
    description: 'Dimensiones del cofre',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly dimensions?: number;

  @ApiProperty({
    example: "https://amazon.com",
    description: 'Información acerca del cofre',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  readonly informationUrl?: string;

}