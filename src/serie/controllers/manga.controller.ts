import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';

import { CreateMangaDto, UpdateMangaDto, CreateSerieWithMangaDto } from '../dto';
import { ParseMongoIdPipe } from 'src/common/pipes';
import { ResponseMessage } from 'src/common/decorators';
import { MangaService, SerieService } from '../services';


@Controller('manga')
export class MangaController {
  private readonly logger = new Logger(MangaController.name);

  constructor(
    private readonly mangaService: MangaService,
    private readonly serieService: SerieService,
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
    const {
      volumesNumber,
      editorial,
      editorialCountry,
      language,
      ...serieData
    } = createSerieWithMangaDto;
    this.logger.debug({msg: "data received", createSerieWithMangaDto});
    console.log(createSerieWithMangaDto);
    
    const serie = await this.serieService.create(serieData as any);
    if (!serie) {
      // throw new Error('Failed to create serie');
      return null;
    }

    const manga = await this.mangaService.create({
      idSerie: serie._id.toString(),
      volumesNumber,
      editorial,
      editorialCountry,
      language,
    });

    if (!manga) {
      // throw new Error('Failed to create manga');
      return null;
    }

    return {
      data: { serie, manga },
      message: "Manga cerated successfully"
    }
  }
}