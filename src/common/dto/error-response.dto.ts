import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";


export class ErrorResponseDto {
  @ApiProperty({ example: false })
  ok: boolean;

  @ApiProperty({ example: new Date().toISOString() })
  timestamp: string;

  @ApiProperty({ example: 'Bad Request' })
  message: string;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: "localhost/api/v1/resource" })
  @IsString()
  path: string;

  @ApiProperty({ example: { field: 'error description' } })
  @IsObject()
  error: any;
}
