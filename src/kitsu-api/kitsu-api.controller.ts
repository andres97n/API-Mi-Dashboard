import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KitsuApiService } from './kitsu-api.service';
import { CreateKitsuApiDto } from './dto/create-kitsu-api.dto';
import { UpdateKitsuApiDto } from './dto/update-kitsu-api.dto';

@Controller('kitsu-api')
export class KitsuApiController {
  constructor(private readonly kitsuApiService: KitsuApiService) {}

  @Post()
  create(@Body() createKitsuApiDto: CreateKitsuApiDto) {
    return this.kitsuApiService.create(createKitsuApiDto);
  }

  @Get()
  findAll() {
    return this.kitsuApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kitsuApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKitsuApiDto: UpdateKitsuApiDto) {
    return this.kitsuApiService.update(+id, updateKitsuApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kitsuApiService.remove(+id);
  }
}
