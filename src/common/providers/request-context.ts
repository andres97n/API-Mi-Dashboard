import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { API_SUB_PATH } from '../constants';


@Injectable({ scope: Scope.REQUEST })
export class RequestContext {
  constructor(@Inject(REQUEST) private req: Request) {}

  getBaseUrl(): string {
    const apiSubPath = process.env.API_SUB_PATH || API_SUB_PATH;
    const version = this.req.originalUrl.split('/')[2] ?? null;
    const apiVersionPath = version ? `${version}/` : '';
    return `${this.req.protocol}://${this.req.get('Host')}/${apiSubPath}/${apiVersionPath}`;
  }
}
