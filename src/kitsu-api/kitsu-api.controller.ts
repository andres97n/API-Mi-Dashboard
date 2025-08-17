import { Controller, Get, Param, Query, ParseIntPipe, UseInterceptors, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { KitsuApiService } from './kitsu-api.service';
import { ApiResponseWrapper, ResponseMessage } from 'src/common/decorators';
import { ReplaceKitsuApiUrlInterceptor } from './interceptors';
import { SearchKitsuApiDto } from './dto';
import { CreateSerieDto } from 'src/serie/dto';


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

  @ApiOperation({ 
    summary: 'Obtains additional kitsu information replacing with Kitsu AP url base' 
  })
  @ResponseMessage('Kitsu information retrieved successfully')
  @Get('*rest')
  findKitsuAdditionalInfo(@Param('rest') rest: string[]) {
    return this.kitsuApiService.findAdditionalKitsuInformation(rest);
  }

  @ApiOperation({ summary: 'Creates a new series by Kitsu ID' })
  @ApiResponseWrapper(CreateSerieDto, 200, 'Kitsu API found serie by ID and create new Series')
  @ResponseMessage('Series created successfully')
  @Post(':id')
  createSerieByKitsuId(@Param('id', ParseIntPipe) id: number) {
    return this.kitsuApiService.createSerieByKitsuId(id);
  }

}
