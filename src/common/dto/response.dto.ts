import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, } from "class-validator";


export class ResponseDto<T> {
  @ApiProperty({ example: true })
  @IsBoolean()
  ok: boolean;
  
  @ApiProperty({ example: new Date().toISOString() })
  @IsString()
  timestamp: string;

  @ApiProperty({ example: "Success" })
  @IsString()
  message: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  statusCode: number;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  data: T;

  @ApiProperty({ example: {} })
  @IsOptional()
  @IsObject()
  meta: any;

  @ApiProperty({ example: "localhost/api/v1/resource" })
  @IsString()
  @IsOptional()
  path: string;

  @ApiProperty({ example: null })
  @IsOptional()
  @IsObject()
  error: any;
}