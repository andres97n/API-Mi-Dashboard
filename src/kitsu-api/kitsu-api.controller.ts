import { Controller, Get, Param, Query, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { KitsuApiService } from './kitsu-api.service';
import { SearchKitsuApiDto } from './dto';
import { ApiResponseWrapper } from 'src/common/decorators';
import { ReplaceKitsuApiUrlInterceptor } from './interceptors';


@Controller('kitsu-api')
export class KitsuApiController {
  constructor(private readonly kitsuApiService: KitsuApiService) {}

  @UseInterceptors(ReplaceKitsuApiUrlInterceptor)
  @ApiResponseWrapper(SearchKitsuApiDto, 200, 'Kitsu API search results')
  @ApiOperation({ summary: 'Find all series by query' })
  @Get()
  findAll(@Query() query: SearchKitsuApiDto) {
    return this.kitsuApiService.findAll(query);
  }

  @UseInterceptors(ReplaceKitsuApiUrlInterceptor)
  @ApiOperation({ summary: 'Obtains series by ID with default type' })
  @ApiResponseWrapper(SearchKitsuApiDto, 200, 'Kitsu API found serie by ID')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.kitsuApiService.findOne(id, 'anime');
  }

  @UseInterceptors(ReplaceKitsuApiUrlInterceptor)
  @ApiOperation({ summary: 'Obtains series by type with ID' })
  @ApiResponseWrapper(SearchKitsuApiDto, 200, 'Kitsu API found serie by ID with type')
  @Get(':type/:id')
  findOneWithType(
    @Param('type') type: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.kitsuApiService.findOne(id, type);
  }
}
