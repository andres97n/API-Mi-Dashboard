import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { SerieService } from './serie.service';
import { CreateSerieDto, UpdateSerieDto } from './dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParseMongoIdPipe } from 'src/common/pipes';
import { ResponseMessage } from 'src/common/decorators';


@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @ResponseMessage('Serie created successfully')
  @Post()
  create(@Body() createSerieDto: CreateSerieDto) {
    return this.serieService.create(createSerieDto);
  }

  @ResponseMessage('Series returned successfully')
  @Get()
  findAll() {
    return this.serieService.findAll();
  }

  @ResponseMessage('Series returned successfully')
  @Get()
  findAllWithFilter(@Query() query: PaginationQueryDto) {
    return this.serieService.findAllWithFilter(query);
  }

  @ResponseMessage('Serie found successfully')
  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.serieService.findOne(id);
  }

  @ResponseMessage('Serie updated successfully')
  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string, 
    @Body() updateSerieDto: UpdateSerieDto
  ) {
    return this.serieService.update(id, updateSerieDto);
  }

  @ResponseMessage('Serie deleted successfully')
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.serieService.remove(id);
  }
}
