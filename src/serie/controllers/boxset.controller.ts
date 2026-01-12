import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { BoxsetService } from "../services";
import { ParseMongoIdPipe } from "src/common/pipes";
import { ResponseMessage } from "src/common/decorators";
import { CreateBoxsetDto, UpdateBoxsetDto } from "../dto";


@Controller('boxset')
export class BoxsetController {
  constructor(
    private readonly boxsetService: BoxsetService,
  ) {}
  
  @ResponseMessage('Boxset created successfully')
  @Post()
  create(@Body() createMangaDto: CreateBoxsetDto) {
    return this.boxsetService.create(createMangaDto);
  }

  @ResponseMessage('Boxsets returned successfully')
  @Get()
  findAll() {
    return this.boxsetService.findAll();
  }

  @ResponseMessage('Boxset found successfully')
  @Get(':id')
  findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.boxsetService.findById(id);
  }

  @ResponseMessage('Boxset updated successfully')
  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string, 
    @Body() updateMangaDto: UpdateBoxsetDto
  ) {
    return this.boxsetService.update(id, updateMangaDto);
  }

  @ResponseMessage('Boxset deleted successfully')
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.boxsetService.remove(id);
  }
}