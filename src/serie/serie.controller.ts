import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';


@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Post()
  create(@Body() createSerieDto: CreateSerieDto) {
    return this.serieService.create(createSerieDto);
  }

  @Get()
  findAll() {
    return this.serieService.findAll();
  }

  @Get()
  findAllWithFilter(@Query() query: PaginationQueryDto) {
    return this.serieService.findAllWithFilter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSerieDto: UpdateSerieDto) {
    return this.serieService.update(+id, updateSerieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serieService.remove(+id);
  }
}
