import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { errorResponse } from './response.helper';
import { ErrorResponseDetail } from '../interfaces';
import { DEFAULT_EXCEPTION_MESSAGE } from '../constants';
import { getErrorMessage } from './error.helper';


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

export const getExceptionDefault = (status: number, message?: string) => {
  throw new HttpException(message ?? DEFAULT_EXCEPTION_MESSAGE, status);
}

export const showErrorException = (
  errors: any, 
  statusCode?: number,
  subField?: string, 
): void => {
  
  if (statusCode === 404) 
    throw new NotFoundException(getErrorMessage(errors, subField));

    getExceptionDefault(500, getErrorMessage(errors, subField));
  }