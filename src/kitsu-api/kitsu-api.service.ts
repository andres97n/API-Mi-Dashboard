import { Injectable } from '@nestjs/common';

import { SearchKitsuApiDto } from './dto';
import { kitsuSearching } from './helpers';


@Injectable()
export class KitsuApiService {
  // create(createKitsuApiDto: CreateKitsuApiDto) {
  //   return 'This action adds a new kitsuApi';
  // }

  async findAll(kitsuSearchDto: SearchKitsuApiDto) {
    return await kitsuSearching(kitsuSearchDto);
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
