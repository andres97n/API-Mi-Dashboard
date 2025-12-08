import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSerieDto, UpdateSerieDto } from '../dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { paginate } from 'src/common/helpers/pagination.helper';
import { GenericService } from 'src/common/services';
import { SERIES_DEFAULT_FILTER } from '../constants';
import { Serie } from '../entities/serie.entity';


@Injectable()
export class SerieService extends GenericService<Serie> {
  constructor(
    @InjectModel( Serie.name ) 
    private readonly serieModel: Model<Serie>,
  ) {
    super(serieModel);
  }

  async create(createSerieDto: CreateSerieDto) {
    return await super.create(createSerieDto);
  }

  async findAllWithFilter(paginationQuery: PaginationQueryDto) {
    return await paginate(
      this.serieModel, 
      paginationQuery, 
      SERIES_DEFAULT_FILTER
    );
  }

  async update(id: string, updateSerieDto: UpdateSerieDto) {
    return await super.update(id, updateSerieDto, `Serie with id ${id} not found`);
  }

  async remove(id: string) {
    return await super.remove(id, `Serie with id ${id} not found`);
  }
}
