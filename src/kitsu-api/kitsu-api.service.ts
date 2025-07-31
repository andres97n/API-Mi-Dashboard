import { Injectable } from '@nestjs/common';

import { SearchKitsuApiDto } from './dto';
import { getKitsuSerieById, kitsuSearching } from './helpers';


@Injectable()
export class KitsuApiService {

  async findAll(kitsuSearchDto: SearchKitsuApiDto) {
    return await kitsuSearching(kitsuSearchDto);
  }

  async findOne(id: number, type: string = 'anime') {
    return await getKitsuSerieById(type, id);
  }
  
}
