import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MinLength } from "class-validator";


export class SearchKitsuApiDto {
  @ApiProperty({
    example: 'anime',
    description: 'Referencia de búsqueda en Kitsu API',
    required: true,
  })
  @IsString()
  @MinLength(2)
  readonly reference: string;
  
  @ApiProperty({
    example: 'Dragon Ball Z',
    description: 'Nombre de la serie a buscar',
    required: true,
  })
  @IsString()
  @MinLength(2)
  readonly name: string;

  @ApiProperty({
    example: 'text',
    description: 'Atributo/Tipo de búsqueda',
    required: false,
  })
  @IsString()
  @MinLength(2)
  @IsOptional()
  readonly attribute?: string;

  @ApiProperty({
    example: 10,
    description: 'Número límite de resultados por página',
    required: false,
  })
  @IsInt()
  @IsOptional()
  readonly pageLimit?: number;

  @ApiProperty({
    example: 0,
    description: 'Número de resultados a omitir para la búsqueda',
    required: false,
  })
  @IsInt()
  @IsOptional()
  readonly pageOffset?: number;
}