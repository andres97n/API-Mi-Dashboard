import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

import { successResponse } from '../helpers';
import { Response as ResponseInterface } from '../interfaces';
import { RESPONSE_MESSAGE_KEY } from '../constants';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseInterface> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message = this.reflector.get<string>(
      RESPONSE_MESSAGE_KEY,
      context.getHandler(),
    ) ?? 'Proceso ejecutado correctamente';

    return next.handle().pipe(
      map((data) => ( successResponse(data, response.statusCode, message) )),
    );
  }
}