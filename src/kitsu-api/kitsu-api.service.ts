import { Injectable } from '@nestjs/common';

import { SearchKitsuApiDto } from './dto';
import { getKitsuErrorById, kitsuFindOneValidation, kitsuSearching } from './helpers';
import { AxiosAdapter } from 'src/common/adapters';
import { KitsuMainIndividualResponse } from './interfaces';
import { KITSU_API_BASE_URL } from './constants';


@Injectable()
export class KitsuApiService {

  constructor(
    private readonly http: AxiosAdapter,
  ) {}

  async findAll(kitsuSearchDto: SearchKitsuApiDto) {
    return await kitsuSearching(kitsuSearchDto);
  }

  async findOne(id: number, type: string = 'anime') {
    kitsuFindOneValidation(id, type);

    const { data } = await this.http.get<KitsuMainIndividualResponse>(
      `${KITSU_API_BASE_URL}${type}/${id}`,
      getKitsuErrorById
    );
    return data;
  }
  
}
