import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateMangaDto, UpdateMangaDto, CreateSerieWithMangaDto } from '../dto';
import { ParseMongoIdPipe } from 'src/common/pipes';
import { ResponseMessage } from 'src/common/decorators';
import { MangaService } from '../services';


@Controller('manga')
export class MangaController {

  constructor(
    private readonly mangaService: MangaService,
  ) {}

  @ResponseMessage('Manga created successfully')
  @Post()
  create(@Body() createMangaDto: CreateMangaDto) {
    return this.mangaService.create(createMangaDto);
  }

  @ResponseMessage('Mangas returned successfully')
  @Get()
  findAll() {
    return this.mangaService.findAll();
  }

  @ResponseMessage('Manga found successfully')
  @Get(':id')
  findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.mangaService.findById(id);
  }

  @ResponseMessage('Manga updated successfully')
  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string, 
    @Body() updateMangaDto: UpdateMangaDto
  ) {
    return this.mangaService.update(id, updateMangaDto);
  }

  @ResponseMessage('Manga deleted successfully')
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.mangaService.remove(id);
  }

  @ResponseMessage('Serie and Manga created successfully')
  @Post('with-serie')
  async createSerieWithManga(@Body() createSerieWithMangaDto: CreateSerieWithMangaDto) {
    return this.mangaService.createMangaAndSerie(createSerieWithMangaDto);
  }
}