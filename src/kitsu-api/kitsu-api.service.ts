import { Injectable } from '@nestjs/common';
import { CreateKitsuApiDto } from './dto/create-kitsu-api.dto';
import { UpdateKitsuApiDto } from './dto/update-kitsu-api.dto';


@Injectable()
export class KitsuApiService {
  create(createKitsuApiDto: CreateKitsuApiDto) {
    return 'This action adds a new kitsuApi';
  }

  findAll() {
    return `This action returns all kitsuApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kitsuApi`;
  }

  update(id: number, updateKitsuApiDto: UpdateKitsuApiDto) {
    return `This action updates a #${id} kitsuApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} kitsuApi`;
  }
}
