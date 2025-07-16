import { HttpStatus } from "@nestjs/common";

import { ErrorResponseDetail, Response } from "../interfaces";


export const successResponse = (
  data: any, 
  statusCode: number = 200,
  message: string = 'Proceso ejecutado correctamente',
): Response => ({
  ok: true,
  data,
  statusCode,
  message,
  timestamp: new Date().toISOString(),
});

export const errorResponse = (
  errorDetail: ErrorResponseDetail
): Response => ({
  ok: false,
  statusCode: errorDetail.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
  error: errorDetail.error ?? null,
  message: errorDetail.message ?? 'Internal server error',
  path: errorDetail.url ?? '/api',
  timestamp: new Date().toISOString(),
});
