import { Injectable } from '@nestjs/common';

import { SearchKitsuApiDto } from './dto';
import { getKitsuSerieById, kitsuSearching } from './helpers';


@Injectable()
export class KitsuApiService {
  // create(createKitsuApiDto: CreateKitsuApiDto) {
  //   return 'This action adds a new kitsuApi';
  // }

  async findAll(kitsuSearchDto: SearchKitsuApiDto) {
    return await kitsuSearching(kitsuSearchDto);
  }

  async findOne(id: number, type: string = 'anime') {
    return await getKitsuSerieById(type, id);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} kitsuApi`;
  // }

  // update(id: number, updateKitsuApiDto: UpdateKitsuApiDto) {
  //   return `This action updates a #${id} kitsuApi`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} kitsuApi`;
  // }
}
