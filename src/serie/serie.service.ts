import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { Serie } from './entities/serie.entity';
import { handleExceptions } from 'src/common/utils';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { paginate } from 'src/common/helpers/pagination.helper';


@Injectable()
export class SerieService {

  constructor(
    @InjectModel( Serie.name ) 
    private readonly serieModel: Model<Serie>,
  ) {}

  async create(@Body() createSerieDto: CreateSerieDto) {
    try {
      const serie = await this.serieModel.create( createSerieDto );
      return serie;

    } catch (error) {
      handleExceptions(error);
    }
  }

  async findAll() {
    return await this.serieModel.find();
  }

  async findAllWithFilter(paginationQuery: PaginationQueryDto) {
    return await paginate(this.serieModel, paginationQuery);
  }

  findOne(id: number) {
    return `This action returns a #${id} serie`;
  }

  update(id: number, updateSerieDto: UpdateSerieDto) {
    return `This action updates a #${id} serie`;
  }

  remove(id: number) {
    return `This action removes a #${id} serie`;
  }
}
