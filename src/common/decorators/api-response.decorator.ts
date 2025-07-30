import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";

import { ResponseDto } from "../dto";
import { ResponseMessage } from "./response-message.decorator";


export function ApiResponseWrapper <DataDto extends Type<unknown>>(
  dataDto: DataDto, 
  status: number = 200, 
  message?: string,
) {

  const isErrorStatus = status >= 400;
  // const props = isErrorStatus
  //   ? { error: { $ref: getSchemaPath(dataDto) }, data: { type: 'object', nullable: true, example: null } }
  //   : { data: { $ref: getSchemaPath(dataDto) }, error: { type: 'object', nullable: true, example: null } };
  const decorators = [
    ApiExtraModels(ResponseDto, dataDto),
    ApiResponse({
      status,
      ...message && { description: message},
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            ...(isErrorStatus && { 
              error: { $ref: getSchemaPath(dataDto) } 
            }),
            ...(!isErrorStatus && { 
              data: { $ref: getSchemaPath(dataDto) } 
            }),
          }
        }
      ]
    }
  }),
    ...(message ? [ResponseMessage(message)] : []),
  ];

  return applyDecorators(...decorators);
}