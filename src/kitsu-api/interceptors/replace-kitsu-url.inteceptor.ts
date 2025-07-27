import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { replaceKitsuApiUrls } from '../helpers';
import { RequestContext } from 'src/common/providers';
import { KITSU_API_BASE_URL, KITSU_API_NAME } from '../constants';


@Injectable()
export class ReplaceKitsuApiUrlInterceptor implements NestInterceptor {

  constructor(private requestContext: RequestContext) {}
  
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const baseUrl = `${this.requestContext.getBaseUrl()}${KITSU_API_NAME}/`;
    
    return next.handle().pipe(
      map(data => replaceKitsuApiUrls(data, KITSU_API_BASE_URL, baseUrl)),
    );
  }
}
