import { Response } from "../interfaces";


export const successResponse = (
  data: any, 
  code: number = 200,
  message: string = 'Proceso ejecutado correctamente',
): Response => ({
  ok: true,
  data,
  code,
  message,
  timestamp: new Date().toISOString(),
});

export const errorResponse = (
  message: string, 
  url: string = '', 
  code: number = 400
): Response => ({
  ok: false,
  code,
  message,
  path: url,
  timestamp: new Date().toISOString(),
});
