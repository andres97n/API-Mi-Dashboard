import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { errorResponse } from './response.helper';
import { ErrorResponseDetail } from '../interfaces';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception instanceof HttpException
      ? exception.getResponse()
      : exception.message || 'Internal server error';

    let error: any = null;
    if (typeof message !== 'string') error = message;

    const errorDetail: ErrorResponseDetail = {
      message: getErrorMessage(message),
      statusCode: status,
      url: request.url,
      error
    };
    response.status(status).json(
      errorResponse(errorDetail)
    );
  }
}

export const getErrorMessage = (message: any): string => {
  if (typeof message === 'string') return message;

  if (typeof message === 'object' && 'message' in message) {
    message = message.message;
  }

  if (Array.isArray(message) && message.length > 0) {
    message = message[0];
  }

  return message || 'Internal server error';
}