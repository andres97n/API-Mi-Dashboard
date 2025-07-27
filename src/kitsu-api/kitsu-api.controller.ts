import { Controller, Get, Param, Query, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { KitsuApiService } from './kitsu-api.service';
import { SearchKitsuApiDto } from './dto';
import { ResponseMessage } from 'src/common/decorators';
import { ReplaceKitsuApiUrlInterceptor } from './interceptors';


@Controller('kitsu-api')
export class KitsuApiController {
  constructor(private readonly kitsuApiService: KitsuApiService) {}

  @ApiOperation({ summary: 'Find all series by query' })
  @ResponseMessage('Kitsu API search results')
  @Get()
  findAll(@Query() query: SearchKitsuApiDto) {
    return this.kitsuApiService.findAll(query);
  }

  @UseInterceptors(ReplaceKitsuApiUrlInterceptor)
  @ApiOperation({ summary: 'Obtains series by ID with default type' })
  @ResponseMessage('Kitsu API found serie by ID')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.kitsuApiService.findOne(id, 'anime');
  }

  @UseInterceptors(ReplaceKitsuApiUrlInterceptor)
  @ApiOperation({ summary: 'Obtains series by type with ID' })
  @ResponseMessage('Kitsu API found serie by ID')
  @Get(':type/:id')
  findOneWithType(
    @Param('type') type: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.kitsuApiService.findOne(id, type);
  }
}
