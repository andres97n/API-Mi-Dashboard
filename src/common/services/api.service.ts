import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable } from "@nestjs/common";
import { catchError, firstValueFrom, map } from "rxjs";


@Injectable()
export class ApiService {
  constructor(private readonly http: HttpService) {}

  async getData<T>(apiUrl: string): Promise<T> {
    const data = await firstValueFrom(
      this.http.get<T>(apiUrl).pipe(
        map(response => response.data),
        catchError(err => {
          console.log(err.response?.data || 'Unknown error');
          const { status, data } = err.response || {};

          //TODO: Handle specific error cases
           throw new HttpException(
            'Fetch error', 
            status || 500
          );
        }),
      ),
    );

    return data;
  }
}
