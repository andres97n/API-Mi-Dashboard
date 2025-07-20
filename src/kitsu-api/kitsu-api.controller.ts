import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KitsuApiService } from './kitsu-api.service';
import { SearchKitsuApiDto } from './dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';


@Controller('kitsu-api')
export class KitsuApiController {
  constructor(private readonly kitsuApiService: KitsuApiService) {}

  // @Post()
  // create(@Body() createKitsuApiDto: CreateKitsuApiDto) {
  //   return this.kitsuApiService.create(createKitsuApiDto);
  // }

  @ResponseMessage('Kitsu API search results')
  @Get()
  findAll(@Query() query: SearchKitsuApiDto) {
    return this.kitsuApiService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.kitsuApiService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateKitsuApiDto: UpdateKitsuApiDto) {
  //   return this.kitsuApiService.update(+id, updateKitsuApiDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.kitsuApiService.remove(+id);
  // }
}
