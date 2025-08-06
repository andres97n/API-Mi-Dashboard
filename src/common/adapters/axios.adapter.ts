import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';

import { HttpAdapter } from '../interfaces';
import { handleApiError } from '../helpers';


@Injectable()
export class AxiosAdapter implements HttpAdapter {
   
  constructor(
    private readonly httpService: HttpService
  ) {}

  get<T>(
    apiUrl: string, 
    showError?: (data: any) => void
  ): Promise<T> {
    return firstValueFrom(
      this.httpService.get<T>(apiUrl).pipe(
        map(response => response.data),
        catchError(err => handleApiError(err, showError)),
      ),
    );
  }

}