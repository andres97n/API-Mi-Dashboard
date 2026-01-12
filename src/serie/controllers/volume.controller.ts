import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { VolumeService } from "../services";
import { ResponseMessage } from "src/common/decorators";
import { ParseMongoIdPipe } from "src/common/pipes";
import { CreateVolumeDto, UpdateVolumeDto } from "../dto";


@Controller('volume')
export class VolumeController {
  constructor(
    private readonly volumeService: VolumeService,
  ) {}

  @ResponseMessage('Volume created successfully')
  @Post()
  create(@Body() createMangaDto: CreateVolumeDto) {
    return this.volumeService.create(createMangaDto);
  }

  @ResponseMessage('Volumes returned successfully')
  @Get()
  findAll() {
    return this.volumeService.findAll();
  }

  @ResponseMessage('Volume found successfully')
  @Get(':id')
  findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.volumeService.findById(id);
  }

  @ResponseMessage('Volume updated successfully')
  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string, 
    @Body() updateMangaDto: UpdateVolumeDto
  ) {
    return this.volumeService.update(id, updateMangaDto);
  }

  @ResponseMessage('Volume deleted successfully')
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.volumeService.remove(id);
  }
}