import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSerieDto, UpdateSerieDto } from './dto';
import { Serie } from './entities/serie.entity';
import { handleExceptions } from 'src/common/utils';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { paginate } from 'src/common/helpers/pagination.helper';
import { SERIES_DEFAULT_FILTER } from './constants';
import { GenericService } from 'src/common/services';


@Injectable()
export class SerieService extends GenericService<Serie> {
  constructor(
    @InjectModel( Serie.name ) 
    private readonly serieModel: Model<Serie>,
  ) {
    super(serieModel);
  }

  async create(@Body() createSerieDto: CreateSerieDto) {
    try {
      const serie = await this.serieModel.create( createSerieDto );
      return serie;

    } catch (error) {
      handleExceptions(error);
    }
  }

  async findAllWithFilter(paginationQuery: PaginationQueryDto) {
    return await paginate(
      this.serieModel, 
      paginationQuery, 
      SERIES_DEFAULT_FILTER
    );
  }

  async update(id: string, updateSerieDto: UpdateSerieDto) {
    const serie = await this.serieModel.findByIdAndUpdate(
      id,
      updateSerieDto,
      { new: true }
    );
    if (!serie) throw new NotFoundException(`Serie with id ${id} not found`);
    return serie;
  }

  async remove(id: string) {
    const serie = await this.serieModel.findByIdAndUpdate(
      id,
      { state: 'D' },
      { new: true }
    );
    if (!serie) throw new NotFoundException(`Serie with id ${id} not found`);
    return serie;
  }
}
